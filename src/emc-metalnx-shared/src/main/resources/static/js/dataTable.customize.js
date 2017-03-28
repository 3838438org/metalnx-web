//patterns for dom option in datatables
var dtPatternForMetadata = '<"row"<"download_csv pull-left col-sm-12 col-md-12">><"row"<"col-md-12 col-lg-12 col-xs-12"<"col-md-6"l<"toolbar">><"col-md-6"i>>><"row"<"col-md-12"tr>><"row"<"col-md-12"p>>';
var dtPatternMlxCollections =  '<"row"<"col-md-12 col-lg-12 col-xs-12"<"col-md-6 col-sm-6 col-xs-6"<"toolbar">><"col-md-2 col-sm-1 col-xs-1"><"col-md-4 col-sm-5 col-xs-5"fl>><"col-md-12 col-xs-12"i>>'+
                            '<"row"<"col-md-12 col-lg-12 col-xs-12"tr>>'+
                            '<"row"<"col-md-12 col-lg-12 col-xs-12"p>>';
var dtPatternMlxStandard =  '<"row"<"col-md-12 col-lg-12 col-xs-12"<"col-md-3 col-xs-4"l<"toolbar">><"col-md-6 col-xs-4"p><"col-md-3 col-xs-4"f>><"col-md-12 col-xs-12"i>>'+
                            '<"row"<"col-md-12 col-lg-12 col-xs-12"tr>>'+
                            '<"row"<"col-md-12 col-lg-12 col-xs-12"p>>';
var dtPatternMetadataTemplate = '<"row"<"col-sm-12 col-md-12"<"col-xs-6 #info_templateFieldsListTable"i><"col-xs-6"f>>><"row"<"col-sm-12 col-md-12"tr>>';
var dtPatternUserMgmt = '<"row"<"col-sm-12 col-md-12"<"col-xs-4"l><"col-xs-4"i><"col-xs-4"f>>><"row"<"col-sm-12 col-md-12"tr>><"row"<"col-md-12"p>>';

//hash containing messages to be translated
var i18n = {
	    "decimal":        "",
	    "emptyTable":     "No data available in table",
	    "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
	    "infoEmpty":      "Showing 0 to 0 of 0 entries",
	    "infoFiltered":   "(filtered from _MAX_ total entries)",
	    "infoPostFix":    "",
	    "thousands":      ",",
	    "lengthMenu":     "_MENU_",
	    "loadingRecords": "Loading...",
	    "processing":     '<img class="center-block" src="../images/ajax_loader.gif" /><p class="text-center" >Loading...</p>',
	    "search":         "_INPUT_",
	    "searchPlaceholder": "Search...",
	    "zeroRecords":    "No matching records found",
	    "paginate": {
	        "first":      "First",
	        "last":       "Last",
	        "next":       '<i class="fa fa-chevron-right"></i>',
	        "previous":   '<i class="fa fa-chevron-left"></i>'
	    },
	    "aria": {
	        "sortAscending":  ": activate to sort column ascending",
	        "sortDescending": ": activate to sort column descending"
	    }
	}

//Adds Action button on Collection table
function addCollectionActions(table_id, datatable){

    $("div.toolbar").html(
                '<div id="actions" class="btn-group pull-left">'+
                '   <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" disabled="">'+
                '       <span>Action</span> &nbsp; <span class="caret"></span> <span class="sr-only">Toggle Dropdown</span> '+
                '   </button> '+
                '   <ul class="dropdown-menu" role="menu"> '+
                '       <li>'+
                '           <a href="#" id="moveBtn" class="hideElement" data-toggle="modal" data-target="#moveModal"><span><i class="fa fa-exchange"></i> </span><span>Move</span></a>'+
                '       </li>'+
                '       <li>'+
                '           <a href="#" id="copyBtn" class="hideElement" data-toggle="modal" data-target="#copyModal"><span><i class="fa fa-files-o"></i></span> <span>Copy</span></a>'+
                '       </li>'+
                '       <li>'+
                '           <a href="#" id="replicateBtn" class="hideElement" data-toggle="modal" data-target="#replicateModal"><span><i class="fa fa-clone"></i></span> Replicate</a>'+
                '       </li>'+
                '       <li>'+
                '           <a href="#" id="modifyBtn" class="hideElement" onclick="showModifyForm();"><span><i class="fa fa-pencil-square-o"> </i></span> <span>Edit</span></a>'+
                '       </li><li><a href="#" id="applyTemplatesBtn" class="hideElement" onclick="listAllTemplates();"><span><i class="fa fa-th"></i></span> <span>Apply Template</span></a>'+
                '       </li>'+
                '       <li class="divider"></li> <li> <a id="downloadBtn" href="/emc-metalnx-web/fileOperation/prepareFilesForDownload/" class="hideElement"><span><i class="fa fa-cloud-download"></i></span> <span>Download</span> </a>'+
                '       </li>'+
                '       <li class="divider"></li><li><a href="#" id="deleteBtn" class="hideElement" data-toggle="modal" data-target="#deleteModal"><span><i class="fa fa-trash-o"></i> </span> <span>Delete</span></a>'+
                '       </li>'+
                '   </ul>'+
                '</div>'+
                '<div id="actionsWait" class="hideElement">Retrieving permissions from Data grid...</div>'
            );

	$("#"+table_id+"_length").addClass("pull-right");
}

/**
 * Resets the start page of a table.
 * After any file operation (copy, move, delete, etc), the table needs to go back to the first page.
 * */
function resetDataTablesStart () {
	for(var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if(key.indexOf('emc-metalnx-web') > -1) {
			var data = JSON.parse(localStorage.getItem(key));
			data.start = 0;
			localStorage.setItem(key, JSON.stringify(data));
		}
	}
}