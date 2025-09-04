#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'ScienceArtist';
const REPO_NAME = 'civic-issues-database';

async function fetchAllIssues() {
  console.log('Fetching all civic issues...');
  
  let allIssues = [];
  let page = 1;
  
  while (true) {
    try {
      const response = await octokit.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'all',
        per_page: 100,
        page: page,
      });
      
      if (response.data.length === 0) break;
      
      allIssues = allIssues.concat(response.data);
      console.log(`Fetched page ${page}: ${response.data.length} issues`);
      page++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching issues:', error);
      break;
    }
  }
  
  return allIssues;
}

function parseIssueData(issue) {
  const body = issue.body || '';
  
  // Extract data from issue body
  const data = {
    id: issue.number,
    title: issue.title,
    state: issue.state,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    labels: issue.labels.map(l => l.name),
    user: issue.user?.login || 'anonymous',
  };
  
  // Parse structured data from body
  const lines = body.split('\n');
  for (const line of lines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      switch (key.trim().toLowerCase()) {
        case 'issue type':
          data.issueType = value;
          break;
        case 'location':
          data.location = value;
          break;
        case 'date':
          data.reportDate = value;
          break;
        case 'user id':
          data.userId = value;
          break;
        case 'image':
          data.imageUrl = value;
          break;
        case 'certificate':
          data.certificateUrl = value;
          break;
      }
    }
  }
  
  return data;
}

async function generateAnalytics(issues) {
  console.log('Generating analytics...');
  
  const analytics = {
    totalReports: issues.length,
    openReports: issues.filter(i => i.state === 'open').length,
    closedReports: issues.filter(i => i.state === 'closed').length,
    issueTypes: {},
    locations: {},
    dailyActivity: {},
    userActivity: {},
    recentActivity: [],
    generatedAt: new Date().toISOString(),
  };
  
  // Process each issue
  for (const issue of issues) {
    const data = parseIssueData(issue);
    
    // Count issue types
    if (data.issueType) {
      analytics.issueTypes[data.issueType] = (analytics.issueTypes[data.issueType] || 0) + 1;
    }
    
    // Count locations
    if (data.location) {
      analytics.locations[data.location] = (analytics.locations[data.location] || 0) + 1;
    }
    
    // Daily activity
    const date = new Date(data.created_at).toISOString().split('T')[0];
    analytics.dailyActivity[date] = (analytics.dailyActivity[date] || 0) + 1;
    
    // User activity
    analytics.userActivity[data.user] = (analytics.userActivity[data.user] || 0) + 1;
    
    // Recent activity (last 50)
    if (analytics.recentActivity.length < 50) {
      analytics.recentActivity.push({
        id: data.id,
        type: data.issueType,
        location: data.location,
        date: data.created_at,
        user: data.user,
      });
    }
  }
  
  // Sort and limit recent activity
  analytics.recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Top issue types
  analytics.topIssueTypes = Object.entries(analytics.issueTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  // Top locations
  analytics.topLocations = Object.entries(analytics.locations)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);
    
  // Top users
  analytics.topUsers = Object.entries(analytics.userActivity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20);
  
  return analytics;
}

async function saveAnalytics(analytics) {
  const analyticsDir = path.join(process.cwd(), 'analytics');
  
  try {
    await fs.mkdir(analyticsDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  // Save main analytics file
  await fs.writeFile(
    path.join(analyticsDir, 'summary.json'),
    JSON.stringify(analytics, null, 2)
  );
  
  // Save individual data files
  await fs.writeFile(
    path.join(analyticsDir, 'issue-types.json'),
    JSON.stringify(analytics.issueTypes, null, 2)
  );
  
  await fs.writeFile(
    path.join(analyticsDir, 'locations.json'),
    JSON.stringify(analytics.locations, null, 2)
  );
  
  await fs.writeFile(
    path.join(analyticsDir, 'daily-activity.json'),
    JSON.stringify(analytics.dailyActivity, null, 2)
  );
  
  await fs.writeFile(
    path.join(analyticsDir, 'recent-activity.json'),
    JSON.stringify(analytics.recentActivity, null, 2)
  );
  
  console.log('Analytics saved to analytics/ directory');
}

async function main() {
  try {
    console.log('Starting civic issues analytics...');
    
    // Fetch all issues
    const issues = await fetchAllIssues();
    console.log(`Total issues found: ${issues.length}`);
    
    // Generate analytics
    const analytics = await generateAnalytics(issues);
    
    // Save results
    await saveAnalytics(analytics);
    
    console.log('Analytics generation completed successfully!');
    console.log(`Processed ${analytics.totalReports} reports`);
    console.log(`Top issue type: ${analytics.topIssueTypes[0]?.[0] || 'N/A'}`);
    console.log(`Top location: ${analytics.topLocations[0]?.[0] || 'N/A'}`);
    
  } catch (error) {
    console.error('Error in analytics generation:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fetchAllIssues, generateAnalytics };
