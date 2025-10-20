/**
 * Language Switch Test Utility
 * This utility helps test the language switching functionality
 * and verify that text corruption is prevented
 */

import languageSwitchService from './languageSwitchService';

export const testLanguageSwitch = {
  /**
   * Simulate rapid language switching to test race condition prevention
   */
  simulateRapidSwitching() {
    console.log('Testing rapid language switching...');
    
    // Simulate multiple rapid language switches
    const switches = ['en', 'vi', 'en', 'vi', 'en'];
    
    switches.forEach((lang, index) => {
      setTimeout(() => {
        console.log(`Switching to ${lang} (${index + 1}/${switches.length})`);
        languageSwitchService.beginLanguageSwitch();
        
        // Simulate the language change
        setTimeout(() => {
          languageSwitchService.endLanguageSwitch();
          console.log(`Completed switch to ${lang}`);
        }, 100);
      }, index * 50); // Very rapid switching
    });
  },

  /**
   * Test timeout cleanup functionality
   */
  testTimeoutCleanup() {
    console.log('Testing timeout cleanup...');
    
    // Create some test timeouts
    const timeout1 = languageSwitchService.safeSetTimeout(() => {
      console.log('This should not run');
    }, 1000);
    
    const timeout2 = languageSwitchService.safeSetTimeout(() => {
      console.log('This should run');
    }, 100);
    
    // Begin language switch (should clear timeout1)
    setTimeout(() => {
      languageSwitchService.beginLanguageSwitch();
      console.log('Language switch begun - first timeout should be cancelled');
      
      setTimeout(() => {
        languageSwitchService.endLanguageSwitch();
        console.log('Language switch ended');
      }, 50);
    }, 200);
  },

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('=== Language Switch Tests ===');
    this.testTimeoutCleanup();
    
    setTimeout(() => {
      this.simulateRapidSwitching();
    }, 1000);
  }
};

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below to run tests automatically
  // testLanguageSwitch.runAllTests();
}

export default testLanguageSwitch;
