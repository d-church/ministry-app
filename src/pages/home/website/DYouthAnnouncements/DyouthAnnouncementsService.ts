import ApiService from "src/services/abstracts/ApiService";

class DYouthAnnouncementsService extends ApiService {
  public async getAnnouncements(locale: "UK" | "EN"): Promise<Announcement> {
    const response = await this.api.get<Announcement[]>("/announcements", {
      headers: {
        "x-locale": locale,
      },
    });

    // TODO: Backend returns array, but we need only first element
    return response.data[0];
  }

  public async updateAnnouncements(
    locale: "UK" | "EN",
    announcements: AnnouncementItem[],
  ): Promise<Announcement> {
    const response = await this.api.patch<Announcement>(
      "/announcements",
      { announcements },
      {
        headers: {
          "x-locale": locale,
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
}

export interface Announcement {
  id: string;
  locale: "UK" | "EN";
  announcements: AnnouncementItem[];
  editorMode: "VISUAL" | "HTML";
  createdAt: string;
  updatedAt: string;
}

export default new DYouthAnnouncementsService();
