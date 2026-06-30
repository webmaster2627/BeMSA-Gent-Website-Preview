async function loadContent(jsonFile) {
  try {
    const response = await fetch(jsonFile);
    const data = await response.json();

    document.querySelectorAll('[data-nameFunction]').forEach(element => {
      const key = element.getAttribute('data-nameFunction');

      if (data[key] !== undefined) {
        element.textContent = data[key];
      }
    });

  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

loadContent('../boardData/boarddata2526.json');