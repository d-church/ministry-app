import { observable, action } from "mobx";
import type { AnnouncementItem, Announcement } from "./DyouthAnnouncementsService";
import DyouthAnnouncementsService from "./DyouthAnnouncementsService";

class State {
  @observable public accessor announcements: AnnouncementItem[] = [];
  @observable public accessor isLoading = false;
  @observable public accessor isSaving = false;
  @observable public accessor locale: "UK" | "EN" = "UK";
  @observable public accessor announcementData: Announcement | null = null;

  @action public setLocale(locale: "UK" | "EN") {
    this.locale = locale;
  }

  @action public async loadAnnouncements(): Promise<void> {
    this.isLoading = true;
    try {
      const data = await DyouthAnnouncementsService.getAnnouncements(this.locale);
      if (data && data.length > 0) {
        this.announcementData = data[0];
        this.announcements = data[0].announcements || [];
      } else {
        this.announcements = [];
        this.announcementData = null;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to load announcements:", errorMessage);
      this.announcements = [];
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
      this.announcementData = updated;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save announcements:", errorMessage);
      throw error;
    } finally {
      this.isSaving = false;
    }
  }

  @action public reorderAnnouncements(startIndex: number, endIndex: number): void {
    const result = Array.from(this.announcements);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    this.announcements = result;
  }

  @action public addAnnouncement(announcement: AnnouncementItem): void {
    this.announcements = [...this.announcements, announcement];
  }

  @action public updateAnnouncement(index: number, announcement: AnnouncementItem): void {
    const updated = [...this.announcements];
    updated[index] = announcement;
    this.announcements = updated;
  }

  @action public removeAnnouncement(index: number): void {
    const updated = [...this.announcements];
    updated.splice(index, 1);
    this.announcements = updated;
  }
}

export default new State();

