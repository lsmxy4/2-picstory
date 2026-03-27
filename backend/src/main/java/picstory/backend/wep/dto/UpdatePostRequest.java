package picstory.backend.wep.dto;

import picstory.backend.domain.PostCategory;

public record UpdatePostRequest(
        PostCategory category,
        String title,
        String content
) {
}
