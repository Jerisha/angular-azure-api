export const expNumeric = {
    default: [
        { viewValue: '=', view: 'Equal To', default: true },
        { viewValue: '<=', view: 'Less than or Equal To', default: false },
        { viewValue: '>=', view: 'Greater than or Equal To', default: false },
        { viewValue: '<', view: 'Less than', default: false },
        { viewValue: '>', view: 'Greater than', default: false },
        { viewValue: '<>', view: 'Not Equal to', default: false },
        
    ]
};

export const expString = {
    default: [       
            { viewValue: '=' , view: 'Equal To', default: false },
            { viewValue: '~=', view: 'Starts With', default: false },
            { viewValue: '=~', view: 'Ends With', default: false },
            { viewValue: '=%', view: 'Contains', default: true },
            { viewValue: '!%', view: 'Does not Contain', default: false },
            { viewValue: '<>', view: 'Not Equal to', default: false },
            
        ]
};
export const expDropdown = {
    default: [       
            { viewValue: '=' , view: 'Equal To', default: false },
            { viewValue: '<>', view: 'Not Equal to', default: false },
            
        ]
};
export const expDate = {
    default: [
        { viewValue: '=', view: 'Equal To', default: true },
        { viewValue: '<=', view: 'Less than or Equal To', default: false },
        { viewValue: '>=', view: 'Greater than or Equal To', default: false },
        { viewValue: '<', view: 'Less than', default: false },
        { viewValue: '>', view: 'Greater than', default: false },
        { viewValue: '<>', view: 'Not Equal to', default: false },
    ]
};

export const expDropdown = {
    default: [       
            { viewValue: '=' , view: 'Equal To', default: false },
            { viewValue: '<>', view: 'Not Equal to', default: false },
            
        ]
};
export const select = {
    default: [
        { view: '~=...begins with', viewValue: '~=', default: true },
        { view: '!~...not begin with', viewValue: '!~', default: true },
        { view: '=%...contains', viewValue: '=%', default: true },
        { view: '!%...not contains', viewValue: '!%', default: true },
        { view: '=...exact match', viewValue: '=', default: true },
        { view: '!=...not =', viewValue: '!=', default: true },
        { view: '<...less than', viewValue: '<', default: true },
        { view: '>...greater tha', viewValue: '>', default: true },
        { view: '<=...less or =', viewValue: '<=', default: true },
        { view: '>=...greater or =', viewValue: '>=', default: true },
        { view: '--...empty(null)', viewValue: '--', default: true },
        { view: '++...is not empty', viewValue: '++', default: true },
        { view: '<>...Between(Range)', viewValue: '<>', default: true },
        { view: '<!>...Not Between(Range)', viewValue: '<!>', default: true },
        { view: '(.)...In List', viewValue: '(.)', default: true },
        { view: '(!)...Not in List', viewValue: '(!)', default: true },
    ]
}

 export const Exp = {
    default: [
        { view: '~=...begins with', viewValue: '~=', default: true },
        { view: '!~...not begin with', viewValue: '!~', default: true },
        { view: '=%...contains', viewValue: '=%', default: true },
        { view: '!%...not contains', viewValue: '!%', default: true },
        { view: '=...exact match', viewValue: '=', default: true },
        { view: '!=...not =', viewValue: '!=', default: true },
        { view: '<...less than', viewValue: '<', default: true },
        { view: '>...greater tha', viewValue: '>', default: true },
        { view: '<=...less or =', viewValue: '<=', default: true },
        { view: '>=...greater or =', viewValue: '>=', default: true },
        { view: '--...empty(null)', viewValue: '--', default: true },
        { view: '++...is not empty', viewValue: '++', default: true },
        { view: '<>...Between(Range)', viewValue: '<>', default: true },
        { view: '<!>...Not Between(Range)', viewValue: '<!>', default: true },
        { view: '(.)...In List', viewValue: '(.)', default: true },
        { view: '(!)...Not in List', viewValue: '(!)', default: true },
    ],
    date: [
        { viewValue: '=', view: 'Equal To', default: true },
        { viewValue: '<=', view: 'Less than or Equal To', default: false },
        { viewValue: '>=', view: 'Greater than or Equal To', default: false },
        { viewValue: '<', view: 'Less than', default: false },
        { viewValue: '>', view: 'Greater than', default: false },
        { viewValue: '<>', view: 'Not Equal to', default: false },
    ],
    numeric: [
        { viewValue: '=', view: 'Equal To', default: true },
        { viewValue: '<=', view: 'Less than or Equal To', default: false },
        { viewValue: '>=', view: 'Greater than or Equal To', default: false },
        { viewValue: '<', view: 'Less than', default: false },
        { viewValue: '>', view: 'Greater than', default: false },
        { viewValue: '<>', view: 'Not Equal to', default: false }
        
    ],
    string: [       
        { viewValue: '=' , view: 'Equal To', default: false },
        { viewValue: '~=', view: 'Starts With', default: false },
        { viewValue: '=~', view: 'Ends With', default: false },
        { viewValue: '=%', view: 'Contains', default: true },
        { viewValue: '!%', view: 'Does not Contain', default: false },
        { viewValue: '<>', view: 'Not Equal to', default: false },
        
    ]
};

