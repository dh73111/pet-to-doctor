package com.ssafy.pettodoctor.api.auth;

//import com.ssafy.api.service.UserService;
//import com.ssafy.db.entity.User;
import com.ssafy.pettodoctor.api.domain.Account;
import com.ssafy.pettodoctor.api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class AccountUserDetailService implements UserDetailsService{
	@Autowired
	AccountService accountService;
	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountService.findByEmail(username);
		if(account != null) {
    			AccountUserDetails accountDetails = new AccountUserDetails(account);
    			return accountDetails;
    		}
    		return null;
    }
}
