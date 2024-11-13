function createCards(block, isLink = false) {
  const ul = document.createElement('ul');

  // Loop through each child (row) of the block
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const anchor = isLink ? document.createElement('a') : null;

    // Move all child elements of `row` into the anchor (if link) or li
    while (row.firstElementChild) {
      isLink ? anchor.append(row.firstElementChild) : li.append(row.firstElementChild);
    }

    // If it's a link card, update the href and remove the link element from children
    if (isLink) {
      [...anchor.children].forEach((div) => {
        const link = div.querySelector('a');
        if (link) {
          anchor.href = link.href;
          link.parentElement.remove();
        }

        // Apply classes based on the type of content inside the div
        updateDivClasses(div);
      });

      li.append(anchor);
    } else {
      // If it's not a link, just apply classes to the li elements
      [...li.children].forEach((div) => {
        updateDivClasses(div);
      });
    }

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}

// Function to update div classes based on its content
function updateDivClasses(div) {
  if (div.children.length === 1 && div.querySelector('picture')) {
    div.className = 'cards-card-image';
  } else if (div.children.length === 1 && div.querySelector('span')) {
    div.className = 'cards-card-icon';
  } else {
    div.className = 'cards-card-body';
  }
}

export default async function decorate(block) {
  const isPromotions = block.classList.contains('promotions');
  const isLinks = block.classList.contains('links');
  const isResources = block.classList.contains('resources');

  if (isPromotions) {
    createCards(block);
  } else if (isLinks) {
    createCards(block, true);
  } else if (isResources) {
    createCards(block);
  } else {
    createCards(block);
  }
}