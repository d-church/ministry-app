import { observable, action } from "mobx";
import ArrayStore from "src/store/abstracts/ArrayStore";
import type { AnnouncementItem, Announcement } from "./DYouthAnnouncementsService";
import DYouthAnnouncementsService from "./DYouthAnnouncementsService";

class State extends ArrayStore<AnnouncementItem> {
  @observable public accessor isSaving = false;
  @observable public accessor locale: "UK" | "EN" = "UK";
  @observable public accessor announcementMeta: Omit<Announcement, "announcements"> | null = null;

  @action public setLocale(locale: "UK" | "EN") {
    this.locale = locale;
  }

  @action public async loadAnnouncements(): Promise<void> {
    this.isLoading = true;
    try {
      const { announcements, ...meta } = await DYouthAnnouncementsService.getAnnouncements(this.locale);

      this.setData(announcements);
      this.announcementMeta = meta;
    } catch (error) {
      console.error("Failed to load announcements:", error);
    } finally {
      this.isLoading = false;
    }
  }

  @action public async saveAnnouncements(): Promise<void> {
    this.isSaving = true;
    try {
      const { announcements, ...meta } = await DYouthAnnouncementsService.updateAnnouncements(
        this.locale,
        this.data || [],
      );

      this.setData(announcements);
      this.announcementMeta = meta;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save announcements:", errorMessage);
      throw error;
    } finally {
      this.isSaving = false;
    }
  }
}

export default new State();

