package picstory.backend.wep.dto;

import picstory.backend.domain.MemberStatus;

public record ChangeStatusRequest(
        MemberStatus status
) {
}
