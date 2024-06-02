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
    
})