// Door Management App with Local Storage

class DoorManager {
    constructor() {
        this.doors = this.loadDoors();
        this.initEventListeners();
        this.renderDoors();
    }

    // Load doors from local storage
    loadDoors() {
        const stored = localStorage.getItem('maktech-doors');
        return stored ? JSON.parse(stored) : [];
    }

    // Save doors to local storage
    saveDoors() {
        localStorage.setItem('maktech-doors', JSON.stringify(this.doors));
    }

    // Initialize event listeners
    initEventListeners() {
        const form = document.getElementById('doorForm');
        const imageInput = document.getElementById('doorImage');
        const imageUploadBox = document.querySelector('.image-upload-box');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const modal = document.getElementById('doorModal');
        const closeBtn = document.querySelector('.close');

        // Form submission
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Image preview
        imageInput.addEventListener('change', (e) => this.previewImage(e));
        
        // Drag and drop
        imageUploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadBox.style.backgroundColor = '#fff0f0';
        });
        
        imageUploadBox.addEventListener('dragleave', () => {
            imageUploadBox.style.backgroundColor = 'white';
        });
        
        imageUploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadBox.style.backgroundColor = 'white';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageInput.files = files;
                this.previewImage({ target: { files } });
            }
        });

        // Search and filter
        searchInput.addEventListener('input', () => this.filterAndRender());
        categoryFilter.addEventListener('change', () => this.filterAndRender());

        // Modal close
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();

        const doorName = document.getElementById('doorName').value;
        const doorCategory = document.getElementById('doorCategory').value;
        const doorPrice = parseFloat(document.getElementById('doorPrice').value);
        const doorColor = document.getElementById('doorColor').value;
        const doorDescription = document.getElementById('doorDescription').value;
        const imageInput = document.getElementById('doorImage');

        if (!imageInput.files[0]) {
            alert('Please select an image');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const door = {
                id: Date.now(),
                name: doorName,
                category: doorCategory,
                price: doorPrice,
                color: doorColor,
                description: doorDescription,
                image: e.target.result,
                createdAt: new Date().toLocaleDateString()
            };

            this.doors.unshift(door);
            this.saveDoors();
            this.renderDoors();
            
            // Reset form
            document.getElementById('doorForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            
            alert('Door added successfully!');
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Preview image
    previewImage(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('imagePreview');
                preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(files[0]);
        }
    }

    // Filter doors
    filterAndRender() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedCategory = document.getElementById('categoryFilter').value;

        const filtered = this.doors.filter(door => {
            const matchesSearch = door.name.toLowerCase().includes(searchTerm) ||
                                door.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || door.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        this.renderDoors(filtered);
    }

    // Render doors
    renderDoors(doorsToRender = this.doors) {
        const container = document.getElementById('doorsContainer');
        container.innerHTML = '';

        if (doorsToRender.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No doors found. Try a different search or add new doors! 👆</p></div>';
            return;
        }

        doorsToRender.forEach(door => {
            const doorCard = document.createElement('div');
            doorCard.className = 'door-card';
            doorCard.innerHTML = `
                <img src="${door.image}" alt="${door.name}" class="door-image">
                <div class="door-info">
                    <span class="door-category">${door.category}</span>
                    <h3 class="door-name">${door.name}</h3>
                    <p class="door-description">${door.description.substring(0, 80)}${door.description.length > 80 ? '...' : ''}</p>
                    <div class="door-meta">
                        <div class="door-price">${door.price.toFixed(2)} $</div>
                        ${door.color ? `<div class="door-color">Color: ${door.color}</div>` : ''}
                    </div>
                    <div class="door-actions">
                        <button class="btn-view" onclick="doorManager.viewDoor(${door.id})">View Details</button>
                        <button class="btn-delete" onclick="doorManager.deleteDoor(${door.id})">Delete</button>
                    </div>
                </div>
            `;
            container.appendChild(doorCard);
        });
    }

    // View door details in modal
    viewDoor(id) {
        const door = this.doors.find(d => d.id === id);
        if (!door) return;

        const modal = document.getElementById('doorModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <img src="${door.image}" alt="${door.name}">
            <h3>${door.name}</h3>
            <div style="text-align: left;">
                <p><strong>Category:</strong> ${door.category}</p>
                <p><strong>Price:</strong> $${door.price.toFixed(2)}</p>
                ${door.color ? `<p><strong>Color:</strong> ${door.color}</p>` : ''}
                <p><strong>Description:</strong></p>
                <p>${door.description}</p>
                <p><strong>Added:</strong> ${door.createdAt}</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // Delete door
    deleteDoor(id) {
        if (confirm('Are you sure you want to delete this door?')) {
            this.doors = this.doors.filter(d => d.id !== id);
            this.saveDoors();
            this.renderDoors();
            alert('Door deleted successfully!');
        }
    }
}

// Initialize the app when DOM is loaded
let doorManager;
document.addEventListener('DOMContentLoaded', () => {
    doorManager = new DoorManager();
});