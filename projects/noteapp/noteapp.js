document.addEventListener("DOMContentLoaded", () => {
    const addNoteModalBtn = document.querySelector('.add-note');
    const modalOverlay = document.querySelector('.modal');
    const modal = document.querySelector('.addnote-modal');
    const titleInput = document.getElementById('title');
    const detailInput = document.getElementById('note-detail');
    const addNoteBtn = document.querySelector('.addnote-button');
    const noteGrid = document.querySelector('.note-grid');
    let noteArray = JSON.parse(localStorage.getItem('allnotes')) || [];
    let editingIndex = null;

    function saveToStorage() {
        localStorage.setItem('allnotes', JSON.stringify(noteArray));
    }

    function renderNotes() {
        noteGrid.innerHTML = '';
        noteArray.forEach((note, index) => {
            const noteElem = document.createElement('div');
            noteElem.className = 'note-container';
            noteElem.innerHTML = `
                <div class="note-title-nav">
                    <h3 class="note-title">${note.title}</h3>
                    <div class="toggle-buttons">
                        <button class="update" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="delete" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <p class="note-description">${note.noteDetail}</p>
            `;
            noteGrid.appendChild(noteElem);
        });
    }

    function showModal(isEdit = false) {
        modal.classList.remove('hide-modal');
        modalOverlay.classList.remove('no-modal');
        document.body.classList.add('hideoverflow');
        if (!isEdit) {
            titleInput.value = '';
            detailInput.value = '';
            editingIndex = null;
        }
    }

    function hideModal() {
        modal.classList.add('hide-modal');
        modalOverlay.classList.add('no-modal');
        document.body.classList.remove('hideoverflow');
    }

    // Open modal
    addNoteModalBtn.addEventListener('click', () => showModal(false));

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', hideModal);
    document.querySelector('.cancel').addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });

    // Add / Update note
    addNoteBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const detail = detailInput.value.trim();
        if (!title && !detail) return;

        if (editingIndex !== null) {
            noteArray[editingIndex] = { title, noteDetail: detail };
        } else {
            noteArray.unshift({ title, noteDetail: detail });
        }

        saveToStorage();
        renderNotes();
        hideModal();
    });

    //Update & delete
    noteGrid.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this note?')) {
                noteArray.splice(index, 1);
                saveToStorage();
                renderNotes();
            }
        }
        if (e.target.classList.contains('update')) {
            editingIndex = index;
            const note = noteArray[index];
            titleInput.value = note.title;
            detailInput.value = note.noteDetail;
            showModal(true);
        }
    });

    // dark mode  
    const themeBtn = document.querySelector('.theme');
    const body = document.querySelector('body');

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeBtn.innerHTML = body.classList.contains('dark-theme') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
    renderNotes();
});
