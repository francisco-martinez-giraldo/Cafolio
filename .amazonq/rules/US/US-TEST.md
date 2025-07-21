Revisa la estructua de cafoli-api y crea una nueva api que soporte esta nueva tabla llamada coffee_prepartions utiliza la carpeta coffees dentro de feautures como guia y actualiza la carpeta types. recuerda que el user_id va ser el email del usuario que ingreso

CREATE TABLE coffee_preparations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL, -- FK to users tabl
coffee_id UUID NOT NULL, -- FK to coffees table
method_dictionary_id UUID NOT NULL, -- FK to dictionary (type = 'method')
temperature_dictionary_id UUID NOT NULL, -- FK to dictionary (type = 'temperature')
ratio_dictionary_id UUID NOT NULL, -- FK to dictionary (type = 'ratio')
ranking NUMERIC(2,1) NOT NULL, -- Ranking from 0.0 to 5.0
notes JSONB, -- JSON array of words (e.g., ['fruity', 'sweet'])
comments TEXT, -- Text field for additional comments
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    CONSTRAINT fk_coffee
        FOREIGN KEY (coffee_id) REFERENCES coffees(id),
    CONSTRAINT fk_method_dictionary
        FOREIGN KEY (method_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_temperature_dictionary
        FOREIGN KEY (temperature_dictionary_id) REFERENCES dictionary(id),
    CONSTRAINT fk_ratio_dictionary
        FOREIGN KEY (ratio_dictionary_id) REFERENCES dictionary(id)

);
