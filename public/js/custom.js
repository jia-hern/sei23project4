$(function() {
	//session storage
	console.log(document.cookie);
	let userRole = document.cookie.split('=')[1];
	console.log(userRole);
	if (window.location.pathname == '/veggies' && userRole == 'true') {
		$('#navigation').append(
			`<li class="nav-item">
    <a class="nav-link" href="/veggies/new">Add Veggie</a>
    </li>`
		);
	}
	if (window.location.pathname == '/fruits' && userRole == 'true') {
		$('#navigation').append(
			`<li class="nav-item">
    <a class="nav-link" href="/fruits/new">Add Fruit</a>
    </li>`
		);
	}
	/*
      Alert disappear after 3 seconds
  */

	setTimeout(() => {
		$('.alert').fadeOut('slow');
	}, 3000);

	/*
      Display new name and quantity on click of add more
    */
	$('#addMore').on('click', function(e) {
		e.preventDefault(); //kill default action
		let numberIdOfRow = $('.listForm .row:last-child').attr('data-id');
		let num = parseInt(numberIdOfRow) + 1;

		let html = `<div class="row mb-3" data-id="${num}" >
          <div class="col-10">
            <label>Name: </label>
            <input name="items[${num}][name]" class="form-control" />
          </div>
          <div class="col-1">
            <label>Quantity: </label>
            <input name="items[${num}][quantity]" class="form-control" type="number" />
          </div>
          <div class="col-1 stayEnd">
            <button class="btn btn-danger del"> x</button>
          </div>
        </div>`;
		$('.listForm').append(html);
	});

	/*
    Remove name and quantity on click of remove
    */
	$('.listForm').on('click', '.del', function(e) {
		e.preventDefault();
		/*
          Find the parent of the parent of the del button 
          and completely remove it from the html
      */
		$(this).parent().parent().remove();
	});
});
