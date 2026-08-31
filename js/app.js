// MakTech Doors - Door Management App
 
// ================================
// WHATSAPP NUMBER
// ================================
// Replace 263XXXXXXXXX with your WhatsApp number.
// Example: 263789009829
const WHATSAPP_NUMBER = "263789009829";
 
 
class DoorManager {
 
    constructor() {
        this.doors = this.loadDoors();
        this.initEventListeners();
        this.renderDoors();
    }
 
 
    // Load doors from local storage
    loadDoors() {
        const stored = localStorage.getItem("maktech-doors");
        return stored ? JSON.parse(stored) : [];
    }
 
 
    // Save doors to local storage
    saveDoors() {
        localStorage.setItem(
            "maktech-doors",
            JSON.stringify(this.doors)
        );
    }
 
 
    // Initialize event listeners
    initEventListeners() {
 
        const form = document.getElementById("doorForm");
        const imageInput = document.getElementById("doorImage");
        const imageUploadBox = document.querySelector(".image-upload-box");
        const searchInput = document.getElementById("searchInput");
        const categoryFilter = document.getElementById("categoryFilter");
        const modal = document.getElementById("doorModal");
        const closeBtn = document.querySelector(".close");
 
 
        // Form submission
        if (form) {
            form.addEventListener("submit", (e) =>
                this.handleFormSubmit(e)
            );
        }
 
 
        // Image preview
        if (imageInput) {
            imageInput.addEventListener("change", (e) =>
                this.previewImage(e)
            );
        }
 
 
        // Drag and drop
        if (imageUploadBox && imageInput) {
 
            imageUploadBox.addEventListener("dragover", (e) => {
                e.preventDefault();
                imageUploadBox.style.backgroundColor = "#fff0f0";
            });
 
 
            imageUploadBox.addEventListener("dragleave", () => {
                imageUploadBox.style.backgroundColor = "white";
            });
 
 
            imageUploadBox.addEventListener("drop", (e) => {
 
                e.preventDefault();
 
                imageUploadBox.style.backgroundColor = "white";
 
                const files = e.dataTransfer.files;
 
                if (files.length > 0) {
                    imageInput.files = files;
 
                    this.previewImage({
                        target: {
                            files: files
                        }
                    });
                }
            });
        }
 
 
        // Search
        if (searchInput) {
            searchInput.addEventListener("input", () =>
                this.filterAndRender()
            );
        }
 
 
        // Category filter
        if (categoryFilter) {
            categoryFilter.addEventListener("change", () =>
                this.filterAndRender()
            );
        }
 
 
        // Close modal
        if (closeBtn && modal) {
 
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
 
 
            window.addEventListener("click", (e) => {
 
                if (e.target === modal) {
                    modal.style.display = "none";
                }
 
            });
        }
    }
 
 
    // ================================
    // ADD NEW DOOR
    // ================================
 
    handleFormSubmit(e) {
 
        e.preventDefault();
 
 
        const doorName =
            document.getElementById("doorName").value;
 
        const doorCategory =
            document.getElementById("doorCategory").value;
 
        const doorPrice =
            parseFloat(
                document.getElementById("doorPrice").value
            );
 
        const doorColor =
            document.getElementById("doorColor").value;
 
        const doorDescription =
            document.getElementById("doorDescription").value;
 
        const imageInput =
            document.getElementById("doorImage");
 
 
        if (!imageInput.files[0]) {
 
            alert("Please select an image");
 
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
 
                createdAt:
                    new Date().toLocaleDateString()
 
            };
 
 
            this.doors.unshift(door);
 
            this.saveDoors();
 
            this.renderDoors();
 
 
            // Reset form
            document
                .getElementById("doorForm")
                .reset();
 
 
            const preview =
                document.getElementById("imagePreview");
 
            if (preview) {
                preview.innerHTML = "";
            }
 
 
            alert("Door added successfully!");
        };
 
 
        reader.readAsDataURL(imageInput.files[0]);
    }
 
 
    // ================================
    // IMAGE PREVIEW
    // ================================
 
    previewImage(e) {
 
        const files = e.target.files;
 
        if (files.length > 0) {
 
            const reader = new FileReader();
 
 
            reader.onload = (event) => {
 
                const preview =
                    document.getElementById("imagePreview");
 
 
                if (preview) {
 
                    preview.innerHTML = `
                        <img 
                            src="${event.target.result}" 
                            alt="Door Preview"
                        >
                    `;
                }
            };
 
 
            reader.readAsDataURL(files[0]);
        }
    }
 
 
    // ================================
    // SEARCH AND FILTER
    // ================================
 
    filterAndRender() {
 
        const searchInput =
            document.getElementById("searchInput");
 
        const categoryFilter =
            document.getElementById("categoryFilter");
 
 
        const searchTerm =
            searchInput
                ? searchInput.value.toLowerCase()
                : "";
 
 
        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "";
 
 
        const filtered = this.doors.filter(door => {
 
            const name =
                (door.name || "").toLowerCase();
 
            const description =
                (door.description || "").toLowerCase();
 
 
            const matchesSearch =
                name.includes(searchTerm) ||
                description.includes(searchTerm);
 
 
            const matchesCategory =
                !selectedCategory ||
                door.category === selectedCategory;
 
 
            return matchesSearch && matchesCategory;
        });
 
 
        this.renderDoors(filtered);
    }
 
 
    // ================================
    // DISPLAY DOORS
    // ================================
 
    renderDoors(doorsToRender = this.doors) {
 
        const container =
            document.getElementById("doorsContainer");
 
 
        if (!container) return;
 
 
        container.innerHTML = "";
 
 
        if (doorsToRender.length === 0) {
 
            container.innerHTML = `
                <div class="empty-state">
                    <p>
                        No doors found. 
                        Try a different search 
                        or add a new door! 🚪
                    </p>
                </div>
            `;
 
            return;
        }
 
 
        doorsToRender.forEach(door => {
 
            const doorCard =
                document.createElement("div");
 
 
            doorCard.className = "door-card";
 
 
            const description =
                door.description || "";
 
 
            doorCard.innerHTML = `
 
                <img 
                    src="${door.image}" 
                    alt="${door.name}" 
                    class="door-image"
                >
 
                <div class="door-info">
 
                    <span class="door-category">
                        ${door.category}
                    </span>
 
                    <h3 class="door-name">
                        ${door.name}
                    </h3>
 
                    <p class="door-description">
                        ${
                            description.substring(0, 80)
                        }${
                            description.length > 80
                                ? "..."
                                : ""
                        }
                    </p>
 
                    <div class="door-meta">
 
                        <div class="door-price">
                            $${Number(door.price).toFixed(2)}
                        </div>
 
                        ${
                            door.color
                            ? `
                                <div class="door-color">
                                    Color: ${door.color}
                                </div>
                              `
                            : ""
                        }
 
                    </div>
 
 
                    <div class="door-actions">
 
                        <button 
                            class="btn-view"
                            onclick="doorManager.viewDoor(${door.id})"
                        >
                            View Details
                        </button>
 
 
                        <button 
                            class="btn-delete"
                            onclick="doorManager.deleteDoor(${door.id})"
                        >
                            Delete
                        </button>
 
                    </div>
 
                </div>
            `;
 
 
            container.appendChild(doorCard);
        });
    }
 
 
    // ================================
    // VIEW DOOR DETAILS
    // ================================
 
    viewDoor(id) {
 
        const door =
            this.doors.find(d => d.id === id);
 
 
        if (!door) return;
 
 
        const modal =
            document.getElementById("doorModal");
 
 
        const modalBody =
            document.getElementById("modalBody");
 
 
        // WhatsApp message
        const message =
            `Hello MakTech Doors 👋
 
I am interested in this door:
 
Door: ${door.name}
Category: ${door.category}
Price: $${Number(door.price).toFixed(2)}
 
Please send me more information and help me with a quotation.`;
 
 
        const whatsappLink =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
 
 
        modalBody.innerHTML = `
 
            <img 
                src="${door.image}" 
                alt="${door.name}"
                style="
                    width:100%;
                    max-height:450px;
                    object-fit:contain;
                    border-radius:10px;
                "
            >
 
 
            <h3 style="
                font-size:26px;
                margin-top:20px;
            ">
                ${door.name}
            </h3>
 
 
            <div style="
                text-align:left;
                line-height:1.7;
            ">
 
                
 
