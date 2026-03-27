package picstory.backend.wep.dto;

import picstory.backend.domain.PostCategory;

public record CreatePostRequest(
        PostCategory category,
        String title,
        String content
) {
}
