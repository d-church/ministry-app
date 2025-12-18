import { observable, action, runInAction } from "mobx";
import ArrayStore from "src/store/abstracts/ArrayStore";
import type { Language } from "src/types";

import DYouthAnnouncementsService, {
  type AnnouncementItem,
  type Announcement,
} from "./DYouthAnnouncementsService";

class State extends ArrayStore<AnnouncementItem> {
  @observable public accessor isSaving = false;
  @observable public accessor language: Language = "uk";
  @observable public accessor announcementMeta: Omit<Announcement, "announcements"> | null = null;
  @observable public accessor saveError: string | null = null;
  @observable public accessor saveSuccess = false;

  @action public setLanguage(language: Language) {
    this.removeData();
    this.language = language;
  }

  @action public async loadAnnouncements(): Promise<void> {
    this.isLoading = true;
    try {
      const { announcements, ...meta } = await DYouthAnnouncementsService.getAnnouncements({
        language: this.language,
      });

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
    this.saveError = null;
    this.saveSuccess = false;
    try {
      const { announcements, ...meta } = await DYouthAnnouncementsService.updateAnnouncements(
        this.data || [],
        { language: this.language },
      );

      this.setData(announcements);
      this.announcementMeta = meta;
      this.saveSuccess = true;
      setTimeout(() => {
        runInAction(() => {
          this.saveSuccess = false;
        });
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save announcements:", errorMessage);
      this.saveError = errorMessage;
      throw error;
    } finally {
      this.isSaving = false;
    }
  }

  @action public removeData() {
    super.removeData();
    this.announcementMeta = null;
    this.language = "uk";
    this.saveError = null;
    this.saveSuccess = false;
  }
}

export default new State();
