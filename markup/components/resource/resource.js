import vars from 'static/js/vars';
const params = (new URL(document.location)).searchParams; 

$.ajax('http://tor-obr.ru/api/resource', {
    method: 'get',
    data: {
        id: params.get('id')
    }
}).done((response) => {
    const resource = response.data[0];

    $('.resource__description-text').html(resource.description);
    const directionId = resource.directions[0].id;
    $.ajax('http://tor-obr.ru/api/direction', {
        method: "get",
        data: {
            id: directionId
        }
    }).done((response) => {
        const directionImage = response.data[0].images[0].src;
        $('.resource__direction-image').attr('src', vars.host+directionImage);
    });

    const resourceImage = resource.image;
    $('.resource__direction-image').attr('src', vars.host+resourceImage);
});

