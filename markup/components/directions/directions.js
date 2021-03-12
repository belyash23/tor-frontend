import vars from 'static/js/vars';
$.ajax('http://tor-obr.ru/api/direction', {
    'method': 'get',
    'data': {
        // 'status': 'published'
    }

}).done((response) => {
    const directions = response.data;
    directions.forEach(item => {
        const direction = $(`<div class="directions-sidebar__direction-card direction-card" data-id="${item.id}">
                                <div class="direction-card__title">${item.name}</div>
                                <img class="direction-card__icon" src="${vars.host+item.icon}" alt="">
                            </div>`);
        $('.directions-sidebar__title').after(direction);
    });

    $('.direction-card').click(e => {
        $('.direction-info').children().not('.direction-info__to-resources').remove();
        const id = $(e.target).closest('.direction-card').data('id');
        $('.direction-info__to-resources').removeClass('disabled').attr('href', `/resources.html?id=${id}`);

        const direction = directions.find(direction => direction.id === id);
        const description = $(`<div class="direction-info__description">${direction.description}</div>`);
        const images = $(`<div class="direction-info__images"></div>`);

        direction.images.forEach(image => {
            images.append($(`<img class="direction-info__image" src="${vars.host+image.src}">`));
        });

        $('.direction-info').prepend(description);
        $('.direction-info').prepend(images);
    });
});

