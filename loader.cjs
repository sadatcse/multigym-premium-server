// loader.cjs
async function loadApp() {
    try {
      // Dynamically import your main ES module file
      await import('./server.js');
    } catch (error) {
      console.error('Failed to load the application:', error);
      process.exit(1);
    }
  }
  
  // Call the function to start the application
  loadApp();