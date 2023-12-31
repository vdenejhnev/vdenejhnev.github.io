const tabItems = Array.from(document.querySelectorAll('.sadebar__link'));
const contentItemst = Array.from(document.querySelectorAll('.main__text__container'));

const formulTabImes = Array.from(document.querySelectorAll('.formul__item'));
const formulContentItems = Array.from(document.querySelectorAll('.formul__text__container'));

const footerDate = document.querySelector('.footert__year')
footerDate.innerHTML = new Date().getFullYear() + ",";


const authorToggle = document.querySelector('.header__link');
const authorContent = document.querySelector('.author__container')
const authorClose = document.querySelector('.closeModal')

var chart_fill = false;
var proportional_data_width = 2;

authorToggle.addEventListener('click', () => {
    authorContent.style.display = "block"
})
authorClose.addEventListener('click', () => {
    authorContent.style.display = "none"
    console.log(authorToggle)
})



const clearClass = (element, className = 'active') => {
    element.find(item => item.classList.remove(`${className}`))
}


const setClass = (element, index, className = 'active') => {
    element[index].classList.add(`${className}`)
}

const checkoutItems = (item, index) => {
    item.addEventListener('click', () => {

        clearClass(tabItems)
        clearClass(contentItemst)

        setClass(tabItems, index)
        setClass(contentItemst, index)
    })
}
tabItems.forEach(checkoutItems);

const checkoutFormulItems = (item, index) => {
    item.addEventListener('click', () => {

        clearClass(formulTabImes)
        clearClass(formulContentItems)

        setClass(formulTabImes, index)
        setClass(formulContentItems, index)
    })
}
formulTabImes.forEach(checkoutFormulItems)

$('.year__up').on('change', function() {
    curr_value = $(this).val().replace(",",".");

    if (curr_value != "") {
        curr_value = parseFloat(curr_value);

        if(curr_value < parseFloat($(this).attr('data_min_value'))) {
            $(this).val($(this).attr('data_min_value'))
        } else if (curr_value > 100) {
            $(this).val(100)
        } else {
            $(this).val(curr_value)
        }
    } else {
        $(this).val($(this).attr('data_min_value'))
    }

})

$('.year__up.progress__system').on('change', function() {
    $('.year__up.progress__system').each(function(index, item) {
        if (parseFloat($(item).val()) >= parseFloat($('.year__up.progress__system').eq([index + 1]).val())) {
            let next_value = parseFloat($(item).val()) + 5.1;

            if (next_value > 100) {
                next_value = 100
            }

            $('.year__up.progress__system').eq([index + 1]).val(parseFloat(next_value.toFixed(2)));
        }
    });
})

function draw_chart() {
    salary = [parseInt($('.salary_value').val())]

    for (item = 0; item < 9; item++) {
        salary.push(parseFloat((salary[item] * (parseFloat($('.annual_increase_value').val()) / 100 + 1)).toFixed(2)))
    }

    proportional_data = [];
    progress_data_needy = [];
    progress_data_doun = [];
    progress_data_mid = [];
    progress_data_up = [];
    progress_data_a = [];
    proportional_data_prev = 0
    progress_data_prev = 0

    isset_max = false;

    for (item = 0; item < 10; item++) {
        proportional_data.push(salary[item] / 100 * parseFloat($('.proportional_system_value').val()) + proportional_data_prev);
        proportional_data_prev = proportional_data[item];

        if ((salary[item] >= 0) && salary[item] <= parseInt($('.calculator__inpit.to_value[data_input="1"]').val())) {
            progress_data_needy.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.needy').val()) + progress_data_prev));
            progress_data_prev = progress_data_needy[item];
        } else if (salary[item] < 0) {
            progress_data_needy.push(null);
        }

        if ((salary[item] >= parseInt($('.calculator__inpit.from_value[data_input="1"]').val())) && (salary[item] <= parseInt($('.calculator__inpit.to_value[data_input="2"]').val()))) {
            progress_data_needy.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.doun').val()) + progress_data_prev));
            progress_data_doun.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.doun').val()) + progress_data_prev));
            progress_data_prev = progress_data_doun[item];
        } else if (salary[item] < parseInt($('.calculator__inpit.from_value[data_input="1"]').val())) {
            progress_data_doun.push(null);
        }

        if ((salary[item] >= parseInt($('.calculator__inpit.from_value[data_input="2"]').val())) && (salary[item] <= parseInt($('.calculator__inpit.to_value[data_input="3"]').val()))) {
            progress_data_needy.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.mid').val()) + progress_data_prev));
            progress_data_doun.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.mid').val()) + progress_data_prev));
            progress_data_mid.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.mid').val()) + progress_data_prev));
            progress_data_prev = progress_data_mid[item];
        } else if (salary[item] < parseInt($('.calculator__inpit.from_value[data_input="2"]').val())) {
            progress_data_mid.push(null);
        }

        if ((salary[item] >= parseInt($('.calculator__inpit.from_value[data_input="3"]').val())) && (salary[item] <= parseInt($('.calculator__inpit.to_value[data_input="4"]').val()))) {
            progress_data_needy.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.up').val()) + progress_data_prev));
            progress_data_doun.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.up').val()) + progress_data_prev));
            progress_data_mid.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.up').val()) + progress_data_prev));
            progress_data_up.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.up').val()) + progress_data_prev));
            progress_data_prev = progress_data_up[item];
        } else if (salary[item] < parseInt($('.calculator__inpit.from_value[data_input="3"]').val())) {
            progress_data_up.push(null);
        }

        if ((salary[item] >= parseInt($('.calculator__inpit.from_value[data_input="4"]').val()))) {
            progress_data_needy.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.a').val()) + progress_data_prev));
            progress_data_doun.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.a').val()) + progress_data_prev));
            progress_data_mid.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.a').val()) + progress_data_prev));
            progress_data_up.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.a').val()) + progress_data_prev));
            progress_data_a.push(Math.round(salary[item] / 100 * parseFloat($('.calculator__inpit.year__up.a').val()) + progress_data_prev));
            progress_data_prev = progress_data_a[item];
        } else if (salary[item] < parseInt($('.calculator__inpit.from_value[data_input="4"]').val())) {
            progress_data_a.push(null);
        }
    }

    chart.data.datasets = [
        {
            data: progress_data_a,
            borderColor:'#0000FF',
            backgroundColor: '#FCFF62',
            borderWidth: 2,
            pointStyle: false,
            fill: chart_fill,
        },
        {
            data: progress_data_up,
            borderColor:'#800080',
            backgroundColor: '#FCFF62',
            borderWidth: 2,
            pointStyle: false,
            fill: chart_fill,
        },
        {
            data: progress_data_mid,
            borderColor:'#0091B1',
            backgroundColor: '#FCFF62',
            borderWidth: 2,
            pointStyle: false,
            fill: chart_fill,
        },
        {
            data: progress_data_doun,
            borderColor:'#FFA500',
            backgroundColor: '#FCFF62',
            borderWidth: 2,
            pointStyle: false,
            fill: chart_fill,
        },
        {
            data: progress_data_needy,
            borderColor:'#FF0000',
            backgroundColor: '#FCFF62',
            borderWidth: 2,
            pointStyle: false,
            fill: chart_fill,
        },
        {
            data: proportional_data,
            borderColor:'#008000',
            borderWidth: proportional_data_width,
            pointStyle: false
        },
    ]

    chart_percent_labels = [0];
    chart_percent_progress_dataset = [];
    chart_percent_proportional_dataset = [];

    for (item = 0; item < 4; item++) {
        chart_percent_labels.push(parseInt($('.calculator__inpit.from_value').eq([item]).val()));
    }

    for (item = 0; item < 5; item++) {
        chart_percent_progress_dataset.push(parseInt($('.calculator__inpit.progress__system').eq([item]).val()));
        chart_percent_proportional_dataset.push(parseInt($('.calculator__inpit.proportional_system_value').val()));
    }

    chart_percent.data.labels = chart_percent_labels;

    chart_percent.data.datasets = [
        {
            data: chart_percent_progress_dataset,
            borderColor:'#601118',
            borderWidth: 2,
            tension: 0.2,
        },
        {
            data: chart_percent_proportional_dataset,
            borderColor:'#34be1f',
            borderWidth: 2,
        },
    ]
    
    chart.update();
    chart_percent.update();

    return proportional_data;
}

$(document).ready(function(){
    draw_chart();
});

$('.formul__item').on('click', function() {
    switch ($(this).find('.formul__numbers').text()) {
        case '1':
        case '3':
            $('.calculator__container').css('display', 'flex');
            $('.calculator__chart_text').css('display', 'none');
            chart_fill = false;
            proportional_data_width = 2;
            draw_chart();
            break;
        case '2':
            $('.calculator__container').css('display', 'flex');
            $('.calculator__chart_text').css('display', 'block');
            chart_fill = '5';
            proportional_data_width = 4;
            draw_chart();
            break;
        case '4':
        case '5':
            $('.calculator__container').css('display', 'none');
            break;
        default:
            break;
    }
})

$('.calculator__inpit.null_value').on('change', function() {
    $(this).val(0)
})

$('.calculator__inpit.year__sp').on('change', function() {
    draw_chart();
})

$('.calculator__inpit.year__up').on('change', function() {
    draw_chart();
})

$('.calculator__inpit.from_value').on('change', function() {
    $('.calculator__inpit.to_value[data_input="' + $(this).attr('data_input') + '"]').val(parseInt($(this).val()) - 1)
    draw_chart();
})

$('.calculator__inpit.to_value').on('change', function() {
    $('.calculator__inpit.from_value[data_input="' + $(this).attr('data_input') + '"]').val(parseInt($(this).val()) + 1)
    draw_chart();
})

Chart.register({
    id: 'chartTextPlugin',
    afterDraw: function(chart) {
        var ctx = chart.ctx;

        if($(ctx.canvas).attr('id') == "mychart"){    
            var progress_point_position = chart.getDatasetMeta(4).data[5].getCenterPoint();
            var proportional_point_position = chart.getDatasetMeta(5).data[5].getCenterPoint();

            if (Math.abs(proportional_point_position.y - progress_point_position.y) >= 42) {
                $('.calculator__chart .calculator__chart_text').css('transform',  'rotate(-22deg)');
                $('.calculator__chart .calculator__chart_text').css('margin-top', progress_point_position.y + ((proportional_point_position.y - progress_point_position.y)/ 2) - 41);
            } else {
                $('.calculator__chart .calculator__chart_text').css('transform',  'none');
                $('.calculator__chart .calculator__chart_text').css('margin-top', 28);
            }
        } else if ($(ctx.canvas).attr('id') == "mychart_percent") {
            var chart_labels = [['needy', '#FF0000'], ['doun','#FFA500'], ['mid','#0091B1'], ['up','#800080'], ['A','#0000FF']];
            ctx.font = '500 13px system-ui';

            for (item = 0; item < 5; item++) {
                ctx.fillStyle = chart_labels[item][1];
                var label_offset;
                if (item == 0) {
                    ctx.textAlign = 'start';
                    label_offset = 14;
                } else {
                    ctx.textAlign = 'center';
                    label_offset = -14;
                }
                
                ctx.fillText(chart_labels[item][0], chart.getDatasetMeta(0).data[item].getCenterPoint().x, chart.getDatasetMeta(0).data[item].getCenterPoint().y + label_offset);
                ctx.fillText(chart_labels[item][0], chart.getDatasetMeta(1).data[item].getCenterPoint().x, chart.getDatasetMeta(1).data[item].getCenterPoint().y + label_offset);
            }

            $('.calculator__chart-percent .calculator__chart_text.proportional_system_text').css('margin-left', chart.getDatasetMeta(1).data[3].getCenterPoint().x - 73);
            $('.calculator__chart-percent .calculator__chart_text.proportional_system_text').css('margin-top', chart.getDatasetMeta(1).data[3].getCenterPoint().y + 10);
            $('.calculator__chart-percent .calculator__chart_text.progress_system_text').css('margin-left', chart.getDatasetMeta(0).data[3].getCenterPoint().x - 62);
            $('.calculator__chart-percent .calculator__chart_text.progress_system_text').css('margin-top', chart.getDatasetMeta(0).data[3].getCenterPoint().y + 12);
        }
    }
});

Chart.register({
    id: 'chartGridLabels',
    beforeDraw: function(chart) {
        var ctx = chart.ctx;

        if ($(ctx.canvas).attr('id') == "mychart_percent") {
            ctx.strokeStyle = '#dfdfdf';

            for (item = 0; item < 5; item++) {
                ctx.beginPath();
                ctx.moveTo(32, chart.getDatasetMeta(0).data[item].getCenterPoint().y);
                ctx.lineTo(chart.getDatasetMeta(0).data[item].getCenterPoint().x, chart.getDatasetMeta(0).data[item].getCenterPoint().y);
                ctx.lineTo(chart.getDatasetMeta(0).data[item].getCenterPoint().x, 260);
                ctx.stroke();
            }

            ctx.strokeStyle = '#000000';
        }
    }
});