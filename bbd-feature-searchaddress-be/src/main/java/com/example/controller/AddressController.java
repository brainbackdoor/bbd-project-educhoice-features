package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.SearchAddress;
import com.example.repository.SearchAddressRepository;

@RequestMapping("/api/")
@RestController
public class AddressController {

	@Autowired
	SearchAddressRepository searchAddressRepository;

	@CrossOrigin
	@GetMapping("/dummy/addresses")
	public List<SearchAddress> returnDummyAll() {
		return searchAddressRepository.findAll();
	}

	@CrossOrigin
	@GetMapping("/dummy/key/{key}")
	public SearchAddress returnDummy(@PathVariable("key") long key) {
		return searchAddressRepository.findByKey(key);
	}

	@CrossOrigin
	@GetMapping("/dummy/address/{address}")
	public List<SearchAddress> findByAddressContaining(@PathVariable("address") String address) {
		return searchAddressRepository.findByValueContaining(address);
	}

}
