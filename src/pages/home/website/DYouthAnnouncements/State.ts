import { observable, action, computed } from "mobx";
import type { AnnouncementItem, Announcement } from "./DyouthAnnouncementsService";
import DyouthAnnouncementsService from "./DyouthAnnouncementsService";

class State {
  @observable public accessor data: Announcement | null = null;
  @observable public accessor isLoading = false;
  @observable public accessor isSaving = false;
  @observable public accessor locale: "UK" | "EN" = "UK";

  @computed get announcements(): AnnouncementItem[] {
    return this.data?.announcements || [];
  }

  @action public setLocale(locale: "UK" | "EN") {
    this.locale = locale;
  }

  @action public async loadAnnouncements(): Promise<void> {
    this.isLoading = true;
    try {
      const data = await DyouthAnnouncementsService.getAnnouncements(this.locale);
      this.data = data || null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to load announcements:", errorMessage);
      this.data = null;
    } finally {
      this.isLoading = false;
    }
  }

  @action public async saveAnnouncements(): Promise<void> {
    this.isSaving = true;
    try {
      const updated = await DyouthAnnouncementsService.updateAnnouncements(
        this.locale,
        this.announcements,
      );
      this.data = updated;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save announcements:", errorMessage);
      throw error;
    } finally {
      this.isSaving = false;
    }
  }

  @action public reorderAnnouncements(startIndex: number, endIndex: number): void {
    if (!this.data) return;
    const result = Array.from(this.announcements);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    this.data = {
      ...this.data,
      announcements: result,
    };
  }

  @action public addAnnouncement(announcement: AnnouncementItem): void {
    if (!this.data) return;
    this.data = {
      ...this.data,
      announcements: [...this.announcements, announcement],
    };
  }

  @action public updateAnnouncement(index: number, announcement: AnnouncementItem): void {
    if (!this.data) return;
    const updated = [...this.announcements];
    updated[index] = announcement;
    this.data = {
      ...this.data,
      announcements: updated,
    };
  }

  @action public removeAnnouncement(index: number): void {
    if (!this.data) return;
    const updated = [...this.announcements];
    updated.splice(index, 1);
    this.data = {
      ...this.data,
      announcements: updated,
    };
  }
}

export default new State();

