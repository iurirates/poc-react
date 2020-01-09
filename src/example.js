import React from "react";
import Admin from "react-crud-admin";
import "react-crud-admin.css";
import Form from "react-jsonschema-form";
import moment from "moment";

export default class example extends Admin {
    constructor() {
        super();
        this.name = "Contact";
        this.name_plural = "Contacts";
        this.list_display_links = ["name"];
        this.list_display = ["name", "number", "address.street", "now"];
        this.header_transforms = {
            name: function (header) {
                return "Contact " + header;
            }
        };
        this.field_transforms = {
            name: function (content, object) {
                return content.toLowerCase();
            },
            image_url: function (content, object) {
                return <img src={content} />;
            }
        };
        this.extra_fields = {
            now: function (object, label) {
                return moment(new Date()).format("LLL");
            }
        };
        this.list_per_page = 10;
    }
    search(term, queryset) {
        let filtered_queryset = [];
        for (var object of queryset) {
            if (object.name.search(new RegExp(term, "i")) >= 0) {
                filtered_queryset.push(object);
            };
        }
        return filtered_queryset;
    }
    get_queryset(page_number, list_per_page, queyset) {

        //Return mocked data
        return [
            {
                id: 1,
                name: "Joe Next",
                number: "12345678",
                address: { street: "abc def" }
            },
            {
                id: 2,
                name: "Teste 2",
                number: "34234234",
                address: { street: "gft rhewr" }
            }
        ];

        //Example of return with result of consult and pagination
        /*
            let backend = "/path/to/backend";
            let path =
                backend +
                "&limit=" +
                list_per_page +
                "&skip=" +
                (page_number - 1) * list_per_page;
            fetch(path, { method: "get" }).then(response => {
                if (response.ok) {
                response.json().then(results => {
                    this.set_queryset(results.data);
                    this.set_total(results.total);
                });
                }
            });
            
            return queryset;
        */
    }
    get_form(object = null) {
        let schema = {
            title: this.name,
            type: "object",
            required: [name],
            properties: {
                id: {
                    type: "number",
                    title: "id",
                    default: Math.floor(1000 * Math.random()) + 1
                },
                name: {
                    type: "string",
                    title: "Name",
                    default: ""
                },
                number: {
                    type: "string",
                    title: "Number",
                    default: ""
                },
                address: {
                    type: "string",
                    title: "Address",
                    properties: {
                        street: {
                            type: "string",
                            title: "Street",
                            default: ""
                        }
                    }
                }
            }
        };

        if (!object) {
            return <Form schema={schema} />;
        } else {
            return <Form schema={schema} formData={object} />;
        }
    }
}