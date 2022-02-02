

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
};


