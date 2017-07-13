/*
 * Copyright (c) 2015-2017, Dell EMC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.emc.metalnx.controller;

import com.emc.metalnx.core.domain.exceptions.DataGridException;
import com.emc.metalnx.services.interfaces.RuleDeploymentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

@Controller
@Scope(WebApplicationContext.SCOPE_SESSION)
@RequestMapping(value = "/rules")
public class RuleDeploymentController {

    private static final Logger logger = LoggerFactory.getLogger(RuleDeploymentController.class);

    @Autowired
    private RuleDeploymentService ruleDeploymentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        logger.info("Rules page");
        return "rules/rulesManagement";
    }

    @RequestMapping(value = "/findall", method = RequestMethod.GET)
    public String findAll() {
        logger.info("Find all rules");
        return "rules/rulesList";
    }

    @RequestMapping(value = "/upload", method = RequestMethod.GET)
    public ResponseEntity<?> upload()
            throws DataGridException {
        logger.info("Uploading rule ...");

        //MultipartFile multipartFile = multipartRequest.getFile("file");
        MultipartFile multipartFile =  new MockMultipartFile("TEST_RULE_NAME.re", "Hello World".getBytes());

        ruleDeploymentService.deployRule(multipartFile);
        return null;
    }
}
