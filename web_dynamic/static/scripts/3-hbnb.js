let amenities_ids = []
$(document).ready(() => {
    input = $("ul input:checkbox");
    input.change(function() {
        let amenities_id = $(this).data("id");
        let item =  $(this).data("name")
        let h4 = $(".amenities_chosen");
        // if checkbox is checked
        if ($(this).prop("checked")) {
            // push to list
            amenities_ids.push(amenities_id)
            // add to h4
            h4.append(`<span>${item}</span>`)
        } else {
            let index = amenities_ids.indexOf(amenities_id);
            if (index !== -1) {
                amenities_id.splice(index, 1);
                h4.find(`span:contains("${item}")`).eq(0).remove();
            }
        }
    })

    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
        if (data.status === 'OK') {
            $("#api_statux").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    },"json")

    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        method:"POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(data)  {
            data.forEach(function(place) {
                const place_to_add = `
                <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
                </div>
                <div class="user">
                    </div>
                    <div class="description">
                    ${place.description}
                    </div>
                </article>
                `;
                $(".places").append(place_to_add);
              });
            },
            error: function() {
              // Handle any errors that occur during the AJAX request here
              console.log("An error occurred while fetching the data.");
            }
          });
    
})