package picstory.backend.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import picstory.backend.domain.Member;
import picstory.backend.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Long singup(
            String name,
            String email,
            String password,
            String passwordConfirm,
            String phone
    ){
        if(memberRepository.existsByEmail(email)){
            throw new RuntimeException("이미 사용중인 이메일 이다.");
        }

        if(password == null || password.length() < 6){
            throw new RuntimeException("비밀번호는 최소 6글자 이상이어야 된다.");
        }

        if(!password.equals(passwordConfirm)){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String hash = passwordEncoder.encode(password);

        Member member = new Member(name, email,hash,phone);

        return memberRepository.save(member).getId();
    }

    @Transactional(readOnly = true)
    public List<Member> findAll(){
        return memberRepository.findAll();
    }
}
