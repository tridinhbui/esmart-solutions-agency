// Generate prompt from content for image generation
router.post(
  "/contents/generate-prompt",
  contentController.generatePromptFromContent
);
