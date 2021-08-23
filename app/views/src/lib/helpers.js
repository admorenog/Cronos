export default class Helper
{
    static cloneObj(obj)
    {
        return JSON.parse(JSON.stringify(obj));
    }

    static getRulesFromDefinition(definition)
    {
        let rules = {};
        for (let idxRequired in definition.required)
        {
            let required = definition.required[idxRequired];
            if (typeof rules[required] == typeof undefined)
            {
                rules[required] = [];
            }
            rules[required].push(v => !!v || `${required} is required.`);
        }
        let properties = definition.properties;
        for (let propertyName in properties)
        {
            if (typeof rules[propertyName] == typeof undefined)
            {
                rules[propertyName] = [];
            }
            let property = properties[propertyName];
            let alias = typeof property["x-alias"] != typeof undefined
                ? property["x-alias"]
                : propertyName;
            let validationMsg = typeof property["x-validation"] != typeof undefined
                ? property["x-validation"]
                : null;
            if (property.type == "string" && typeof property.pattern != typeof undefined)
            {
                let regexValidation = new RegExp(property.pattern);
                rules[propertyName].push(v =>
                {
                    return regexValidation.test(v) || validationMsg
                        || `${alias} doesn't match with ${property.pattern}`;
                });
            }
            if (property.type == "number" && typeof property.minimum != typeof undefined)
            {
                rules[propertyName].push(v =>
                {
                    return v >= property.minimum || validationMsg || `${alias} minimum ${property.minimum}`;
                });
            }
            if (property.type == "number" && typeof property.maximum != typeof undefined)
            {
                rules[propertyName].push(v =>
                {
                    return v <= property.maximum || validationMsg || `${alias} maximum ${property.maximum}`;
                });
            }
        }
        return rules;
    }
}
