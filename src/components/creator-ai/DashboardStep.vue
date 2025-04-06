<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.dashboard.title") }}</h2>

    <!-- Toast Message -->
    <div v-if="toast.show" class="toast-message" :class="toast.type">
      <span>{{ toast.message }}</span>
      <button @click="toast.show = false" class="close-toast">&times;</button>
    </div>

    <!-- Projects Tab -->
    <div class="content-grid">
      <div v-if="loading" class="loading-indicator">
        <p>{{ $t("creatorAI.dashboard.loading") }}</p>
      </div>
      <div v-else-if="projects.length === 0" class="empty-state">
        <p>{{ $t("creatorAI.dashboard.noProjects") }}</p>
      </div>
      <div
        v-else
        v-for="project in projects"
        :key="project.id"
        class="content-card"
        :class="{ finished: project.status === 'finished' }"
        @click="viewProject(project.id)"
      >
        <div class="card-header">
          <h3>{{ project.title }}</h3>
          <div class="card-actions">
            <span class="status-badge" :class="project.status">
              {{
                project.status === "in_progress"
                  ? $t("creatorAI.dashboard.inProgress")
                  : $t("creatorAI.dashboard.finished")
              }}
            </span>
            <button
              class="delete-button"
              @click.stop="confirmDeleteProject($event, project.id)"
              title="Delete project"
            >
              <i class="fa-solid fa-trash"></i>
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
      <div class="project-menu" @click.stop>
        <h3>Select Option</h3>
        <div class="project-name">{{ projectMenuTitle }}</div>
        <div class="menu-options">
          <button
            class="menu-button edit-button"
            @click="goToEditor(projectMenuId)"
          >
            <i class="fas fa-edit"></i> Edit Content
          </button>
          <button
            class="menu-button view-button"
            @click="goToFinal(projectMenuId)"
          >
            <i class="fas fa-eye"></i> View Final Content
          </button>
          <button class="menu-button close-button" @click="closeProjectMenu">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button class="secondary-button" @click="goToHome">
        {{ $t("creatorAI.dashboard.backToHome") }}
      </button>
      <button class="primary-button" @click="createNewContent">
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
.step-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #1c1c4c;
  margin-bottom: 2rem;
  text-align: center;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.content-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  /* border-left: 4px solid #1c1c4c; */
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.content-card.finished {
  border-left-color: #28a745;
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

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  max-width: 70%;
}

.status-badge,
.content-type-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: bold;
}

.status-badge.in_progress {
  background-color: #ecedf7;
  color: #1c1c4c;
}

.status-badge.finished {
  background-color: #e8f5e9;
  color: #28a745;
}

.content-type-badge {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.description {
  color: #6c757d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* -webkit-box-orient: vertical; */
}

.content-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6c757d;
  border-top: 1px solid #eee;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.empty-state,
.loading-indicator {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.primary-button {
  background: #1c1c4c;
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
  color: #1c1c4c;
  border: 1px solid #1c1c4c;
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
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.project-menu h3 {
  margin-top: 0;
  color: #1c1c4c;
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
  background-color: #1c1c4c;
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
</style>
