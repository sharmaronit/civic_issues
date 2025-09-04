#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function createSummary() {
  try {
    console.log('Creating analytics summary...');
    
    const analyticsDir = path.join(process.cwd(), 'analytics');
    
    // Read analytics data
    const summaryPath = path.join(analyticsDir, 'summary.json');
    const summaryData = JSON.parse(await fs.readFile(summaryPath, 'utf8'));
    
    // Create markdown summary
    const markdown = `# 📊 Civic Issues Analytics Summary

**Generated:** ${new Date(summaryData.generatedAt).toLocaleString('en-IN')}

## 📈 Overview
- **Total Reports:** ${summaryData.totalReports.toLocaleString()}
- **Open Issues:** ${summaryData.openReports.toLocaleString()}
- **Resolved Issues:** ${summaryData.closedReports.toLocaleString()}

## 🏆 Top Issue Types
${summaryData.topIssueTypes.map(([type, count], index) => 
  `${index + 1}. **${type}** - ${count} reports`
).join('\n')}

## 📍 Top Locations
${summaryData.topLocations.slice(0, 10).map(([location, count], index) => 
  `${index + 1}. **${location}** - ${count} reports`
).join('\n')}

## 👥 Top Contributors
${summaryData.topUsers.slice(0, 10).map(([user, count], index) => 
  `${index + 1}. **${user === 'anonymous' ? 'Anonymous User' : user}** - ${count} reports`
).join('\n')}

## 📅 Recent Activity
${summaryData.recentActivity.slice(0, 5).map(activity => 
  `- **${activity.type}** in ${activity.location} (${new Date(activity.date).toLocaleDateString('en-IN')})`
).join('\n')}

---
*This summary is automatically generated every 6 hours by GitHub Actions*
`;

    // Save markdown summary
    await fs.writeFile(path.join(analyticsDir, 'summary.md'), markdown);
    console.log('Summary markdown created successfully!');
    
  } catch (error) {
    console.error('Error creating summary:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  createSummary();
}

module.exports = { createSummary };
