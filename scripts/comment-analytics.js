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

async function commentOnIssue(issueNumber) {
  try {
    console.log(`Adding analytics comment to issue #${issueNumber}...`);
    
    // Read analytics data
    const analyticsDir = path.join(process.cwd(), 'analytics');
    const summaryPath = path.join(analyticsDir, 'summary.json');
    
    let analyticsData;
    try {
      analyticsData = JSON.parse(await fs.readFile(summaryPath, 'utf8'));
    } catch (error) {
      console.log('No analytics data available yet, skipping comment');
      return;
    }
    
    // Create comment content
    const comment = `## 📊 Analytics Update

Your civic issue has been added to our community database!

**Current Community Stats:**
- 📈 **Total Reports:** ${analyticsData.totalReports.toLocaleString()}
- 🆕 **Open Issues:** ${analyticsData.openReports.toLocaleString()}
- ✅ **Resolved Issues:** ${analyticsData.closedReports.toLocaleString()}

**Top Issue Types:**
${analyticsData.topIssueTypes.slice(0, 3).map(([type, count]) => 
  `- ${type}: ${count} reports`
).join('\n')}

**Top Locations:**
${analyticsData.topLocations.slice(0, 3).map(([location, count]) => 
  `- ${location}: ${count} reports`
).join('\n')}

---
*This comment is automatically generated. Analytics update every 6 hours.*
*View full analytics: [Summary](https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/analytics/summary.md)*`;

    // Add comment to issue
    await octokit.issues.createComment({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: issueNumber,
      body: comment,
    });
    
    console.log(`Successfully commented on issue #${issueNumber}`);
    
  } catch (error) {
    console.error('Error commenting on issue:', error);
    // Don't exit, just log the error
  }
}

async function main() {
  const issueNumber = process.argv[2];
  
  if (!issueNumber) {
    console.error('Usage: node comment-analytics.js <issue-number>');
    process.exit(1);
  }
  
  await commentOnIssue(parseInt(issueNumber));
}

if (require.main === module) {
  main();
}

module.exports = { commentOnIssue };
