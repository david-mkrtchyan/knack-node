const zohoConfigs = require('../db-configs/zoho-configs');
const request = require('request');
const convert = require('xml-js');

class MarketerService {

    constructor(
        authToken = zohoConfigs.authToken,
        email  = zohoConfigs.email ,
        workspaceName = zohoConfigs.workspaceName,
        tableName = zohoConfigs.tableName
    ) {
        this.authToken = authToken;
        this.email = email;
        this.workspaceName = workspaceName;
        this.tableName = tableName;
    }

    getMarketers(data, res) {
        request.get(this._getZohoUrl(data), (error, response, body) => {
            body && body.includes('error') ? res.status(500).send(body) :
                res.send(this._transform(JSON.parse(convert.xml2json(body, {compact: true, spaces: 2}))));
        });
    }

    _getZohoUrl(filters) {
        let restClient = `https://analyticsapi.zoho.com/api/${this.email}/${this.workspaceName}/${this.tableName}`;
        let configs = `ZOHO_ACTION=EXPORT&ZOHO_OUTPUT_FORMAT=XML&ZOHO_ERROR_FORMAT=XML&ZOHO_API_VERSION=1.0&authtoken=${this.authToken}`;
        let criteria = `ZOHO_CRITERIA=(MKTREPNAME=\'${filters.full_name}\'`;
        if (filters.date_range && filters.date_range.from && filters.date_range.to) {
            criteria += `AND ACTDATE>=\'${filters.date_range.from}\' AND ACTDATE<=\'${filters.date_range.to}\'`;
        }
        if (filters.date.from && filters.date.to) {
            criteria += `AND \'Payroll period'\=\'${filters.date.from}\' - \'${filters.date.to}\'`;
        }
        criteria += `)`;

        return `${restClient}/?${configs}&${criteria}`;
    }

    _transform(data) {
        let transformedData = [];
        if (data.response.result.rows.row && data.response.result.rows.row.length) {
            data.response.result.rows.row.forEach(rowItem => {
                let item = {};
                rowItem.column.forEach(columnItem => item[columnItem._attributes.name] = columnItem._text);
                transformedData.push(item);
            });
        }
        return transformedData;
    }
}

module.exports =  new MarketerService();
