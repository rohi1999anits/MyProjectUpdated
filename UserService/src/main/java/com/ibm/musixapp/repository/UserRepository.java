package com.ibm.musixapp.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ibm.musixapp.model.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
	User findByEmail(String email);
	User findByEmailAndPassword(String email, String password);
	User getUserById(int id);
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update User u set u.profileImage=:image where u.id=:userId")
	void updateProfileImage(byte[] image, Long userId);
	//when this method is called in service this @Query in java persistence query language is triggered
	//note:the field names in model class should be same
	//image and userId will come from front end and in backend rest controller captures it using @requestParam
	@Transactional
	@Modifying
	@Query("update User u set u.password=:password where u.id=:userId")
	void updatePassword(String password, Long userId);

}
