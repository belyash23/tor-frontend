import vars from 'static/js/vars';
const params = (new URL(document.location)).searchParams; 
let resources = [];
let categories = []

$.ajax('http://tor-obr.ru/api/category', {
    'method': 'get',
    'data': {
        // 'status': 'published'
    }
}).done((response) => {



    $.ajax('http://tor-obr.ru/api/resource', {
        'method': 'get',
        'data': {
            'direction_id': params.get('id')
        }
    }).done((response) => {
        resources = response.data;
        resources.forEach(item => {
            const category = categories.find(category=>category.id==item.category_id)
            const resource = $(`<a class="resource" href="/resource.html?id=${item.id}" data-category_id=${category.id} data-id=${item.id} style="background-color:${category.color}" data-age_min=${item.age_min} data-age_max=${item.age_max}>
                                    <div class="resource__header">
                                        <img class="resource__icon" src="${vars.host+category.icon}">
                                        <div class="resource__age">Возраст: ${item.age_min}-${item.age_max}</div>
                                    </div>
                                    <div class="resource__title">${item.name}</div>
                                </a>`);
            $('.resources__container').append(resource);
        });
    });



    categories = response.data;
    categories.forEach(item => {
        const category = $(`<div class="category" data-id="${item.id}" style="background-color:${item.color}">
                                <div class="category__title">${item.name}</div>
                                <img class="category__icon" src="${vars.host+item.icon}">
                            </div>`);
        $('.categories__container').append(category);
    });

    $('.category').click(e => {
        const id = $(e.target).closest('.category').data('id');

        $('.resource').each((i, item) => {
            item = $(item);
            if(item.data('category_id') == id) {
                item.show()
            }
            else {
                item.hide();
            }
        });
    });
});

$('.resources__search-button').click(() => {
    const query = $('.query__input').val();
    const age_min = $('.age-input__min').val();
    const age_max = $('.age-input__max').val();

    $('.resource').show();

    $('.resource').each((i, item) => {
        item = $(item);
        if(query && item.children('.resource__title').text().toUpperCase().indexOf(query.toUpperCase())  == -1) {
            item.hide();
        }
        if(age_min && item.data('age_min') < age_min && item.data('age_max') < age_min) {
            item.hide();
        }
        if(age_max && item.data('age_max')  > age_max) {
            item.hide();
        }
    });
});

