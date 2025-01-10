const addButtonToCommentBoxes = () => {
  const commentBoxes = document.querySelectorAll('.comments-comment-box--cr');

  commentBoxes.forEach((commentBox) => {
    if (!commentBox.querySelector('.fill-comment-button')) {
      const button = document.createElement('button');
      button.innerText = 'Use Post Description';
      button.className = 'fill-comment-button';

      button.style.margin = '10px';
      button.style.padding = '8px 16px';
      button.style.borderRadius = '8px';
      button.style.border = 'none';
      button.style.backgroundColor = '#0073e6';
      button.style.color = '#ffffff';
      button.style.fontSize = '14px';
      button.style.fontWeight = 'bold';
      button.style.cursor = 'pointer';
      button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      button.style.transition = 'all 0.3s ease';

      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#005bb5';
        button.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
      });
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#0073e6';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });

      commentBox.appendChild(button);

      button.addEventListener('click', () => {
        const postElement = commentBox.closest('.feed-shared-update-v2');
        const postTextElement =
          postElement?.querySelector('.update-components-text') ||
          postElement?.querySelector('.feed-shared-text__text-view') ||
          postElement?.querySelector('.attributed-text-segment-list__content');
        const postText = postTextElement?.innerText || 'No text found';

        const commentInput = commentBox.querySelector('.ql-editor');

        console.log('Post Text:', postText);

        if (commentInput) {
          commentInput.innerHTML = '';

          let index = 0;
          const typingSpeed = 5;

          const typeText = () => {
            if (index < postText.length) {
              commentInput.innerHTML = postText.slice(0, index + 1);
              index++;
              const event = new Event('input', { bubbles: true });
              commentInput.dispatchEvent(event);

              setTimeout(typeText, typingSpeed);
            }
          };

          typeText();
        }
      });
    }
  });
};

// Observe DOM changes to dynamically add buttons to new comment boxes
const observer = new MutationObserver(() => {
  addButtonToCommentBoxes();
});

// Start observing the body for child list changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial call to add buttons to already loaded comment boxes
addButtonToCommentBoxes();
