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
<<<<<<< HEAD
=======
};
export const selectcupid= {
    defaultcupid: [
        
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
};
export const selectlist = {
    defaultlist: [
        { view: '~=...begins with', viewValue: '~=', default: true },
        { view: '!~...not begin with', viewValue: '!~', default: true },
        { view: '=%...contains', viewValue: '=%', default: true },
        { view: '!%...not contains', viewValue: '!%', default: true },
        { view: '=...exact match', viewValue: '=', default: true },
        { view: '!=...not =', viewValue: '!=', default: true },
        { view: '<...less than', viewValue: '<', default: true },
        { view: '>...greater than', viewValue: '>', default: true },
        { view: '<=...less or =', viewValue: '<=', default: true },
        { view: '>=...greater or =', viewValue: '>=', default: true },
        { view: '--...empty(null)', viewValue: '--', default: true },
        { view: '++...is not empty', viewValue: '++', default: true },
    ]
};
    export const selectmonth = {
        defaultmonth: [
            { view: '=...Equal to', viewValue: '=', default: true },
            { view: '<...less than', viewValue: '<', default: true },
            { view: '>...greater than', viewValue: '>', default: true },
            { view: '<=...less or =', viewValue: '<=', default: true },
            { view: '>=...greater or =', viewValue: '>=', default: true },
           
        ]
    };
        export const selectsrc = {
            defaultsrc: [
                { view: '=...Equal to', viewValue: '=', default: true },
            ]
>>>>>>> 8064132bc5270abd083961131394554bf2689cd5
};


