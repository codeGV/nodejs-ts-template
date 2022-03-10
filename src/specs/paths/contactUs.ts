module.exports=[{
    url:'/',
    post:{
        summary:'Create',
        description:'Create contact details',
        parameters:[{
            in:'body',
            name:'body',
            description:'Model of contact detail creation',
            required:true,
            schema:{
                $ref:'#/definitions/contactUsReq'
            }
        }],
        responses:{
            default:{
                description:'Unexpected error',
                schema:{
                    $ref:'#/definitions/Error'
                }
            }
        }
    }
}]