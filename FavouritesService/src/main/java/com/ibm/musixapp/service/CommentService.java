package com.ibm.musixapp.service;

import java.util.List;

import com.ibm.musixapp.exception.DuplicateComment;
import com.ibm.musixapp.model.Comment;

public interface CommentService {

	public List<Comment> findBySongName(String song);

	public Comment saveComment(Comment cm) throws DuplicateComment;
}