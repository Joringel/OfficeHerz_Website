 var SORTING_BUTTON = 'a[href^="#"][data-toggle^="sort"]';

    $('.productlist__table')
        .not('.initialized')
        .addClass('initialized')
        .on('click', SORTING_BUTTON, function (e) {
            e.preventDefault();

            var $button = $(this);
            var $col = $button.closest('td, th');
            var $table = $($button.attr('href'));
            var colPos = $col.prevAll().length;

            if ($button.is('.active')) {
                unsortRows($table);
                $button.removeClass('active');
            } else {
                $button.closest('table').find(SORTING_BUTTON).removeClass('active');
                $button.addClass('active');

                switch ($button.attr('data-toggle')) {
                    case "sort-asc":
                        sortRowsByColumn($table, colPos);
                        break;
                    case "sort-desc":
                        sortRowsByColumn($table, colPos, true);
                        break;
                }
            }
        });

    function unsortRows($table) {
        // remove sorting class
        $table.find('tr > .sorted').removeClass('sorted');

        // unsort every tbody individually
        $table.children('tbody').each(function () {
            animateReorganisation($(this), function (row) {
                return parseFloat($(row).attr('data-position'));
            });
        });
    }

    function sortRowsByColumn($table, colPos, reverse) {

        // set sorted class on columns which are sorted
        $table.find('tr > .sorted').removeClass('sorted');
        $table.find('tr > *:nth-child(' + (colPos + 1) + ')').addClass('sorted');

        // sort every tbody individually
        $table.children('tbody').each(function () {
            animateReorganisation($(this), function (row) {
                var $column = $(row).children().eq(colPos);

                if (!reverse && $column.is('[data-value-asc]')) {
                    return $column.data('value-asc');
                }

                if (reverse && $column.is('[data-value-desc]')) {
                    return $column.data('value-desc');
                }

                if ($column.is('[data-value]')) {
                    return $column.data('value');
                }

                return $.trim($column.text());
            }, reverse);
        });
    }

    function animateReorganisation($tbody, sortFunc, reverse) {

        var $rows = $tbody.children('tr');

        var sortedRows = $rows.sort(function (a, b) {
            a = sortFunc(a);
            b = sortFunc(b);

            if (a > b) {
                return reverse ? -1 : 1;
            }

            if (a < b) {
                return reverse ? 1 : -1;
            }

            return 0;
        });

        // remember old positions
//        var rowsWithPosition = [];
//        _.each($rows, function (row) {
//            rowsWithPosition.push({
//                row: row,
//                position: row.getBoundingClientRect()
//            });
//        });

        $tbody.append(sortedRows);

        // transform all rows to old position
//        _.each(rowsWithPosition, function (rowData) {
//            var oldTop = rowData.position.top;
//            var newTop = rowData.row.getBoundingClientRect().top;
//            var offset = (oldTop - newTop);
//            if (offset !== 0) {
//                $(rowData.row).css({
//                    transition: 'none',
//                    transform: 'translate(0, ' + offset + 'px)'
//                });
//            }
//        });

        // wait a tick and then remove the transformation
        setTimeout(function () {
            $rows.css({
                transition: 'transform .3s',
                transform: ''
            });
        }, 0);
    }
