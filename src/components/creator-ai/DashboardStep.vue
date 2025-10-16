<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.dashboard.title") }}</h2>

    <!-- Toast Message -->
    <div
      v-if="toast.show"
      class="toast-message"
      :class="toast.type"
    >
      <span>{{ toast.message }}</span>
      <button
        class="close-toast"
        @click="toast.show = false"
      >
        &times;
      </button>
    </div>

    <!-- Projects Tab -->
    <div class="content-grid">
      <div
        v-if="loading"
        class="loading-indicator"
      >
        <p>{{ $t("creatorAI.dashboard.loading") }}</p>
      </div>
      <div
        v-else-if="projects.length === 0"
        class="empty-state"
      >
        <p>{{ $t("creatorAI.dashboard.noProjects") }}</p>
      </div>
      <div
        v-for="project in projects"
        v-else
        :key="project.id"
        class="content-card"
        :class="{ finished: project.status === 'finished' }"
        @click="viewProject(project.id)"
      >
        <div class="card-header">
          <h3>{{ project.title }}</h3>
          <div class="card-actions">
            <span
              class="status-badge"
              :class="project.status"
            >
              {{
                project.status === "in_progress"
                  ? $t("creatorAI.dashboard.inProgress")
                  : $t("creatorAI.dashboard.finished")
              }}
            </span>
            <button
              class="delete-button"
              title="Delete project"
              @click.stop="confirmDeleteProject($event, project.id)"
            >
              <i class="fa-solid fa-trash" />
            </button>
          </div>
        </div>
        <p class="description">
          {{ project.description || $t("creatorAI.dashboard.noDescription") }}
        </p>
        <div class="content-meta">
          <span>{{ formatDate(project.createdAt) }}</span>
          <span>{{ project.type }}</span>
        </div>
      </div>
    </div>

    <!-- Project Action Menu Overlay (Re-created) -->
    <div
      v-if="showProjectMenu"
      class="project-menu-overlay"
      @click="closeProjectMenu"
    >
      <div
        class="project-menu"
        @click.stop
      >
        <h3>Select Option</h3>
        <div class="project-name">
          {{ projectMenuTitle }}
        </div>
        <div class="menu-options">
          <button
            class="menu-button edit-button"
            @click="goToEditor(projectMenuId)"
          >
            <i class="fas fa-edit" /> Edit Content
          </button>
          <button
            class="menu-button view-button"
            @click="goToFinal(projectMenuId)"
          >
            <i class="fas fa-eye" /> View Final Content
          </button>
          <button
            class="menu-button close-button"
            @click="closeProjectMenu"
          >
            <i class="fas fa-times" /> Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button
        class="secondary-button"
        @click="goToHome"
      >
        {{ $t("creatorAI.dashboard.backToHome") }}
      </button>
      <button
        class="primary-button"
        @click="createNewContent"
      >
        {{ $t("creatorAI.dashboard.createNew") }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardStep",
  data() {
    return {
      projects: [],
      loading: true,
      activeTab: "projects",
      deleteConfirmation: {
        show: false,
        projectId: null,
      },
      toast: {
        show: false,
        message: "",
        type: "info", // info, success, error
        timeout: null,
      },
      // Replace projectMenu with separate variables
      showProjectMenu: false,
      projectMenuId: null,
      projectMenuTitle: "",
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        this.loading = true;

        const response = await axios.get("/api/projects");

        if (response.data.success) {
          this.projects = response.data.data;
        } else {
          console.error("Failed to load projects");
          this.projects = [];
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        this.projects = [];
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    viewProject(projectId) {
      // Find project to display name
      const project = this.projects.find((p) => p.id === projectId);

      // Display selection menu with separate variables
      this.showProjectMenu = true;
      this.projectMenuId = projectId;
      this.projectMenuTitle = project ? project.title : "Project";

      console.log("Showing project menu for:", projectId);
    },

    closeProjectMenu() {
      this.showProjectMenu = false;
    },

    goToEditor(projectId) {
      console.log("Going to editor for project:", projectId);
      this.$emit("edit-project", projectId);
      this.closeProjectMenu();
    },

    goToFinal(projectId) {
      console.log("Going to final view for project:", projectId);
      this.$emit("view-final", projectId);
      this.closeProjectMenu();
    },

    goToHome() {
      this.$router.push("/");
    },

    createNewContent() {
      // Emit event to notify that we want to create new content with reset data
      this.$emit("create-new");
    },

    // Debug method to check project ID format
    debugProjectId(projectId) {
      console.log("Project ID value:", projectId);
      console.log("Project ID type:", typeof projectId);
      console.log("Project ID length:", projectId ? projectId.length : "N/A");

      // Check if ID is in UUID format (example check)
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      console.log("Is UUID format:", uuidPattern.test(projectId));

      return projectId;
    },

    // Show toast message
    showToast(message, type = "info") {
      // Clear any existing timeout
      if (this.toast.timeout) {
        clearTimeout(this.toast.timeout);
      }

      // Set toast properties
      this.toast.show = true;
      this.toast.message = message;
      this.toast.type = type;

      // Auto hide after 3 seconds
      this.toast.timeout = setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },

    confirmDeleteProject(event, projectId) {
      // Prevent click event from propagating to card
      event.stopPropagation();

      // Debug project ID
      this.debugProjectId(projectId);

      if (confirm(this.$t("creatorAI.dashboard.deleteConfirm"))) {
        this.deleteProject(projectId);
      }
    },

    async deleteProject(projectId) {
      try {
        console.log("Deleting project with ID:", projectId);

        // Ensure projectId is not null and is a string
        if (!projectId) {
          console.error("Project ID is null or undefined");
          this.showToast(this.$t("creatorAI.dashboard.deleteError"), "error");
          return;
        }

        // Log URL for debugging
        const url = `/api/projects/${projectId}`;
        console.log("Delete URL:", url);

        const response = await axios({
          method: "DELETE",
          url: url,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Delete response:", response);

        if (response.data && response.data.success) {
          // Remove the project from the projects array
          this.projects = this.projects.filter(
            (project) => project.id !== projectId
          );

          // Show success message
          this.showToast(
            this.$t("creatorAI.dashboard.deleteSuccess"),
            "success"
          );

          // Refresh projects list
          this.fetchProjects();
        } else {
          console.error("Failed to delete project", response.data);
          this.showToast(this.$t("creatorAI.dashboard.deleteFailed"), "error");
        }
      } catch (error) {
        console.error("Error deleting project:", error);

        // Log detailed error for debugging
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }

        this.showToast(
          `${this.$t("creatorAI.dashboard.deleteError")}: ${error.message}`,
          "error"
        );
      }
    },
  },
};
</script>

<style scoped>
/* Simple Black & White Dashboard */
.step-content {
  background: var(--bg-primary);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.step-content::before {
  display: none;
}

.step-content::after {
  display: none;
}

h2 {
  color: black;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: black;
  border-radius: 2px;
}

/* Simple Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Simple Content Cards */
.content-card {
  background: var(--bg-primary);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #333;
}

.content-card.finished {
  border-color: #28a745;
}

.content-card.finished::before {
  display: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-button {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

/* Quantum Card Header */
.card-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  max-width: 70%;
  color: black;
}

/* Simple Status Badges */
.status-badge,
.content-type-badge {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.status-badge::before {
  display: none;
}

.status-badge:hover::before {
  display: none;
}

.status-badge.in_progress {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
}

.status-badge.finished {
  background: #f8f9fa;
  color: #28a745;
  border: 1px solid #28a745;
}

.content-type-badge {
  background: #f8f9fa;
  color: black;
  border: 1px solid #333;
}

/* Quantum Description */
.description {
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Simple Meta Information */
.meta-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  border-top: 1px solid #e5e5e5;
  padding-top: 1rem;
  margin-top: 1rem;
}

/* Quantum Empty State & Loading */
.empty-state {
  text-align: center;
  padding: 4rem;
  color: rgba(0, 0, 0, 0.7);
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  position: relative;
}

.primary-button {
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.primary-button:hover {
  background: #2a2a6c;
}

.secondary-button {
  background: transparent;
  color: black;
  border: 1px solid black;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background: #f8f9fa;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.toast-message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-message.success {
  background-color: #28a745;
}

.toast-message.error {
  background-color: #dc3545;
}

.toast-message.info {
  background-color: #17a2b8;
}

.close-toast {
  background: none;
  border: none;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  font-size: 18px;
}

/* Project Menu Styles */
.project-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.project-menu {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.project-menu h3 {
  margin-top: 0;
  color: black;
  margin-bottom: 0.5rem;
}

.project-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.menu-button {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.edit-button {
  background-color: black;
  color: white;
}

.edit-button:hover {
  background-color: #2a2a6c;
}

.view-button {
  background-color: #28a745;
  color: white;
}

.view-button:hover {
  background-color: #218838;
}

.close-button {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
}

.close-button:hover {
  background-color: #e9ecef;
}

/* Quantum Button Styles */
.button-group {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.primary-button,
.secondary-button {
  padding: 1rem 2.5rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.primary-button {
  background: linear-gradient(135deg, black 0%, black 50%, black 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.primary-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.primary-button:hover::before {
  left: 100%;
}

.primary-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(10px);
}

.secondary-button:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.2);
}

/* Delete Button Quantum Style */
.delete-button {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.delete-button:hover {
  background: rgba(220, 53, 69, 0.2);
  border-color: rgba(220, 53, 69, 0.5);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

/* Quantum Animations */
@keyframes borderGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes underlineGlow {
  0%, 100% { 
    opacity: 0.6; 
    transform: translateX(-50%) scaleX(1); 
  }
  50% { 
    opacity: 1; 
    transform: translateX(-50%) scaleX(1.2); 
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-content {
    padding: 2rem 1.5rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
    max-width: 300px;
  }
  
  h2 {
    font-size: 2rem;
  }
}
</style>
