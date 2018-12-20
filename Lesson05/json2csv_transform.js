'use strict';
console.log('Loading function');

exports.handler = (event, context, callback) => {
    /* Process the list of records */
    const output = event.records.map((record) => {
        const entry = (Buffer.from(record.data, 'base64')).toString('utf8');
        let parsed_entry = JSON.parse(entry);

        /* Transform the parsed results */
        const result = `${parsed_entry.ticker_symbol},${parsed_entry.sector},${parsed_entry.change},${parsed_entry.price}` + "\n";
        const payload = (Buffer.from(result, 'utf8')).toString('base64');
        return {
            recordId: record.recordId,
            result: 'Ok',
            data: payload,
        };

    });
    callback(null, {
        records: output
    });
};