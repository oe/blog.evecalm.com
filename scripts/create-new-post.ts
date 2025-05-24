#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { createInterface } from 'readline';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

// Default category options
const DEFAULT_CATEGORIES = ['前端', 'Tech-Issue', '技术', '哲思'];

/**
 * ANSI color codes for terminal output
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

/**
 * Log colored messages to the console
 */
const logger = {
  info: (message: string) => console.log(`${colors.blue}ℹ ${message}${colors.reset}`),
  success: (message: string) => console.log(`${colors.green}✅ ${message}${colors.reset}`),
  warn: (message: string) => console.log(`${colors.yellow}⚠️ ${message}${colors.reset}`),
  error: (message: string) => console.error(`${colors.red}❌ ${message}${colors.reset}`),
  highlight: (message: string) => `${colors.cyan}${message}${colors.reset}`,
  bold: (message: string) => `${colors.bright}${message}${colors.reset}`,
};

/**
 * Creates a readline interface for user input
 */
function createPrompt() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Ask a question and return the answer
 * @param rl The readline interface
 * @param question The question to ask
 * @returns Promise with the answer
 */
async function askQuestion(rl: ReturnType<typeof createInterface>, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`${question}: `, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Present a multiple-choice selection to the user
 * @param rl The readline interface
 * @param question The prompt question
 * @param options The options to choose from
 * @returns Promise with the selected options
 */
async function askMultipleChoice(
  rl: ReturnType<typeof createInterface>, 
  question: string, 
  options: string[]
): Promise<string[]> {
  console.log(`${question}:`);
  
  // Display options with numbers
  options.forEach((option, index) => {
    console.log(`  ${index + 1}) ${option}`);
  });
  
  console.log(`  ${options.length + 1}) Add custom category`);
  console.log(`\nEnter numbers separated by commas (e.g., 1,3,4):`);
  
  const answer = await new Promise<string>((resolve) => {
    rl.question('> ', (answer) => {
      resolve(answer);
    });
  });
  
  // Parse selected options
  const selected: string[] = [];
  const selections = answer.split(',').map(s => s.trim());
  
  for (const selection of selections) {
    const index = parseInt(selection, 10) - 1;
    
    if (index >= 0 && index < options.length) {
      selected.push(options[index]);
    } else if (index === options.length) {
      // User wants to add a custom category
      const customCategory = await askQuestion(rl, `Enter custom category name`);
      if (customCategory.trim()) {
        selected.push(customCategory.trim());
      }
    }
  }
  
  return selected;
}

/**
 * Convert a string to a valid slug
 * Process normal English sentences by:
 * 1. Trimming whitespace
 * 2. Removing punctuation
 * 3. Converting continuous spaces to hyphens
 * 4. Converting to lowercase
 * @param input The string to convert
 * @returns The converted slug
 */
function convertToSlug(input: string): string {
  return input
    .trim() // Remove leading and trailing whitespace
    .replace(/[^\w\s-]/g, '') // Remove punctuation and special characters (keep letters, numbers, spaces, hyphens)
    .replace(/\s+/g, '-') // Replace continuous spaces with a single hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .toLowerCase(); // Convert to lowercase
}

/**
 * Get the current date and time in the format: YYYY-MM-DD HH:MM:SS
 */
function getCurrentDateTime(): string {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Checks if a frontmatter URI exists in any post file
 * @param uri The URI to check for
 * @returns Promise<string|null> The path where the URI was found, or null if not found
 */
async function checkFrontmatterUri(uri: string): Promise<string | null> {
  try {
    const years = await fs.promises.readdir(BLOG_CONTENT_DIR);
    
    for (const year of years) {
      const yearPath = path.join(BLOG_CONTENT_DIR, year);
      const yearStat = await fs.promises.stat(yearPath);
      
      if (!yearStat.isDirectory()) continue;
      
      const folders = await fs.promises.readdir(yearPath);
      
      for (const folder of folders) {
        const folderPath = path.join(yearPath, folder);
        const folderStat = await fs.promises.stat(folderPath);
        
        if (!folderStat.isDirectory()) continue;
        
        const indexPath = path.join(folderPath, 'index.md');
        if (await exists(indexPath)) {
          const content = await readFile(indexPath, 'utf8');
          
          // Check for uri in frontmatter
          const uriMatch = content.match(/^---[\s\S]*?uri:\s*([^\s\n]+)[\s\S]*?---/m);
          if (uriMatch && uriMatch[1] === uri) {
            return indexPath;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    logger.error(`Error checking frontmatter URI: ${error}`);
    return null;
  }
}

/**
 * Create a new blog post template
 */
async function createNewPost() {
  try {
    const rl = createPrompt();
    
    console.log(`${colors.cyan}📝 Create a new blog post${colors.reset}`);
    console.log(`${colors.cyan}------------------------${colors.reset}`);
    logger.info('Slugs will be processed by removing punctuation,');
    logger.info('converting spaces to hyphens, and making everything lowercase.\n');
    
    // Ask for the post title
    const title = await askQuestion(rl, `Enter post title ${colors.dim}(required)${colors.reset}`);
    if (!title) {
      logger.error('Post title cannot be empty');
      rl.close();
      return;
    }
    
    // Ask for slug (or generate one from title)
    const suggestedSlug = convertToSlug(title);
    const slugInput = await askQuestion(rl, `Enter post slug (press Enter to use: ${logger.highlight(suggestedSlug)})`);
    const slug = slugInput ? convertToSlug(slugInput) : suggestedSlug;
    
    // Show the final slug that will be used
    if (slugInput && slugInput !== slug) {
      logger.info(`Using converted slug: ${logger.highlight(slug)}`);
    }
    
    // Check if the URI exists in any post's frontmatter
    const existingUriPath = await checkFrontmatterUri(slug);
    if (existingUriPath) {
      logger.error(`A post with URI '${logger.highlight(slug)}' already exists at ${existingUriPath}`);
      logger.error('Please choose a different slug to avoid conflicts.');
      rl.close();
      return;
    }
    
    // Ask for categories using the multiple choice interface
    logger.info('Select post categories (required):');
    let categories: string[] = [];
    
    try {
      categories = await askMultipleChoice(rl, 'Choose from existing categories', DEFAULT_CATEGORIES);
      
      // Ensure at least one category is selected
      while (categories.length === 0) {
        logger.error('At least one category is required');
        categories = await askMultipleChoice(rl, 'Choose from existing categories', DEFAULT_CATEGORIES);
      }
    } catch (error) {
      logger.error(`Error selecting categories: ${error}`);
      rl.close();
      return;
    }
    
    // Create the post directories
    const currentYear = new Date().getFullYear().toString();
    const yearDir = path.join(BLOG_CONTENT_DIR, currentYear);
    const postDir = path.join(yearDir, slug);
    
    // Check if the post directory already exists in the current year
    if (await exists(postDir)) {
      logger.error(`A post with slug '${logger.highlight(slug)}' already exists in ${currentYear}`);
      rl.close();
      return;
    }
    
    // Check if the slug exists in other years
    try {
      const years = await fs.promises.readdir(BLOG_CONTENT_DIR);
      for (const year of years) {
        if (year === currentYear) continue; // Already checked current year
        
        const yearPath = path.join(BLOG_CONTENT_DIR, year);
        const yearStat = await fs.promises.stat(yearPath);
        
        if (yearStat.isDirectory()) {
          const existingPostPath = path.join(yearPath, slug);
          if (await exists(existingPostPath)) {
            logger.error(`A post with slug '${logger.highlight(slug)}' already exists in year ${year}.`);
            logger.error('Please choose a different slug to avoid conflicts.');
            rl.close();
            return;
          }
        }
      }
    } catch (error) {
      logger.error(`Error checking for duplicate slugs: ${error}`);
      // Continue anyway since this is just a check
    }
    
    // Create the year directory if it doesn't exist
    if (!await exists(yearDir)) {
      await mkdir(yearDir, { recursive: true });
      logger.info(`Created year directory: ${currentYear}`);
    }
    
    // Create the post directory
    await mkdir(postDir, { recursive: true });
    logger.info(`Created post directory: ${slug}`);
    
    // Create the frontmatter
    const datetime = getCurrentDateTime();
    let frontmatter = `---
title: "${title}"
date: ${datetime}
uri: ${slug}`;
    
    if (categories.length > 0) {
      frontmatter += `\ncategories: \n${categories.map(cat => `  - ${cat}`).join('\n')}`;
    }
    
    frontmatter += `\n---

> Write your post content here...

`;
    
    // Create the index.md file
    const indexPath = path.join(postDir, 'index.md');
    await writeFile(indexPath, frontmatter);
    logger.info(`Created post file: ${path.relative(process.cwd(), indexPath)}`);
    
    console.log('\n');
    logger.success(`Successfully created new post: ${logger.bold(title)}`);
    logger.success(`You can find it at: src/content/blog/${currentYear}/${slug}/index.md`);
    
    rl.close();
  } catch (error) {
    logger.error(`Error creating new post: ${error}`);
    process.exit(1);
  }
}

// Run the function
createNewPost();
