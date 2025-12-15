import ApiService from "src/services/abstracts/ApiService";
import type { Language } from "src/types";

class DYouthAnnouncementsService extends ApiService {
  public async getAnnouncements(language: Language): Promise<Announcement> {
    const response = await this.api.get<Announcement[]>("/announcements", {
      headers: {
        "x-locale": language,
      },
    });

    // TODO: Backend returns array, but we need only first element
    return response.data[0];
  }

  public async updateAnnouncements(
    language: Language,
    announcements: AnnouncementItem[],
  ): Promise<Announcement> {
    const response = await this.api.patch<Announcement>(
      "/announcements",
      { announcements },
      {
        headers: {
          "x-locale": language,
        },
      },
    );
    return response.data;
  }
}

export interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  editorMode?: "VISUAL" | "HTML";
}

export interface Announcement {
  id: string;
  language: Language;
  announcements: AnnouncementItem[];
  createdAt: string;
  updatedAt: string;
}

export default new DYouthAnnouncementsService();
