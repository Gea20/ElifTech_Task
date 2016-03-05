$(document).ready(function(){
	//Add Company Event
	$('#add-company-form').on('submit', function (e){
		addCompany(e);
	});

	//Edit Estimation Event
	$('#edit-company-form').on('submit', function(e){
		updateCompany(e);
	});

	//Remove Estimation Event
	$('#company-table').on('click', '#remove-company', function (){
		id = $(this).data('id');
		removeCompany(id);
	});

	//Clear Entries
	$('#clear-estimations').on('click', function () {
		clearAllCompanies();

	});

	displayCompanies();

	//Function to display Companies
	function displayCompanies() {
		var companyList = JSON.parse(localStorage.getItem('companies'));

        //Sort Companies
		if(companyList != null) {
			companyList = companyList.sort(sortByRelation2);

		}

		//Set Counter
		var i = 0;
		//Check Companies
		if(localStorage.getItem('companies') != null) {
			//Loop Through and display
			$.each(companyList, function(key, value) {
				$('#company-table').append('<tr id="'+ value.id +'">' + 
				                            '<td>' + value.company + '</td>' +
				                            '<td>' + value.company_relation1 + '</td>' +
				                            '<td>' + value.company_relation2 + '</td>' +
				                            '<td>' + value.company_earnings + '</td>' +
				                            '<td>' + value.company_collective + '</td>' +
				                            '<td><a href="edit.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-company" data-id="'+ value.id +'">Remove</a></td>' + 
				                            '</tr>');
			})
		}

	}

	//Function to sort Companies
	function sortByRelation2 (a,b) {
		var aRelation2 = a.company_relation2;
		var bRelation2 = b.company_relation2;
		return((aRelation2 < bRelation2) ? -1 : ((aRelation2 > bRelation2) ? 1 : 0));
	}

	// Function for adding Companies
	function addCompany(e) {
		// Add Unique Id
		var newDate = new Date();
		id = newDate.getTime();

		var company = $('#company-name').val();
        var company_relation1 = $('#relation1').val();
        var company_relation2 = $('#relation2').val();
        var company_earnings = $('#earnings').val();
        var company_collective = $('#collective-earnings').val();
	

	    //Simple Validation
	    if(company == '') {
	    	alert('Company Name is required');
	    	e.preventDefault();
	    } else if(company_earnings == '') {
	    	alert('Estimated Earnings data is required');
	    	e.preventDefault();
	    } else {
	    	companies = JSON.parse(localStorage.getItem('companies'));

	    	//Check companies
	    	if (companies == null) {
	    		companies = [];
	    	}

	    	var companyList = JSON.parse(localStorage.getItem('companies'));

	    	//New Company Object

	    	var new_company = {
	    		"id": id,
	    		"company": company,
	    		"company_relation1": company_relation1,
	    		"company_relation2": company_relation2,
	    		"company_earnings": company_earnings,
	    		"company_collective": company_collective
	    	}

	    	companies.push(new_company);
	    	localStorage.setItem('companies', JSON.stringify(companies));

	    	console.log('Company Added');

	    }
	}

	//Function to update estimations
	function updateCompany(e) {
		var id = $('#company_id').val();
		var company = $('#company-name').val();
        var company_relation1 = $('#relation1').val();
        var company_relation2 = $('#relation2').val();
        var company_earnings = $('#earnings').val();
        var company_collective = $('#collective-earnings').val();

        companyList = JSON.parse(localStorage.getItem('companies'));

        for (var i = 0; i < companyList.length; i++) {
        	if (companyList[i].id == id) {
        		companyList.splice(i,1)
        	}
        	localStorage.setItem('companies', JSON.stringify(companyList));
        }

        //Simple Validation
	    if(company == '') {
	    	alert('Company Name is required');
	    	e.preventDefault();
	    } else if(company_earnings == '') {
	    	alert('Estimated Earnings data is required');
	    	e.preventDefault();
	    } else {
	    	companies = JSON.parse(localStorage.getItem('companies'));

	    	//Check companies
	    	if (companies == null) {
	    		companies = [];
	    	}

	    	var companyList = JSON.parse(localStorage.getItem('companies'));

	    	//New Company Object

	    	var new_company = {
	    		"id": id,
	    		"company": company,
	    		"company_relation1": company_relation1,
	    		"company_relation2": company_relation2,
	    		"company_earnings": company_earnings,
	    		"company_collective": company_collective
	    	}

	    	companies.push(new_company);
	    	localStorage.setItem('companies', JSON.stringify(companies));


        }
	}

	//Function to remove company
	function removeCompany (id) {
		if(confirm('Are you sure you want to delete this entry?')) {
			var companyList = JSON.parse(localStorage.getItem('companies'));

			for (var i=0; i < companyList.length; i++) {
        	if (companyList[i].id == id) {
        		companyList.splice(i,1)
    		}
        	localStorage.setItem('companies', JSON.stringify(companyList));
        }

        location.reload();

		}
    }



	//Function to clear all entries
	function clearAllCompanies () {
		if (confirm('Do you want clear all entries?')) {
			localStorage.clear();
			location.reload();
		}
	}
});


//Function for getting single Company
function getCompany() {
	var $_GET = getQueryParams(document.location.search);
	id = $_GET['id'];

	var companyList = JSON.parse(localStorage.getItem('companies'));

	for(i=0; i < companyList.length; i++) {
		if(companyList[i].id == id) {
			$('#edit-company-form #company_id').val(companyList[i].id);
			$('#edit-company-form #company-name').val(companyList[i].company);
			$('#edit-company-form #relation1').val(companyList[i].company_relation1);
			$('#edit-company-form #relation2').val(companyList[i].company_relation2);
			$('#edit-company-form #earnings').val(companyList[i].company_earnings);
			$('#edit-company-form #collective-earnings').val(companyList[i].company_collective);
		}

	}
}

// Function to Get HTTP GET Requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
	