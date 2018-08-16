import evenRound from "../../Utils/evenRound";

const getComparisonOfNumAndDen = function(T, B) {
    var TAN4T,
        SINP,
        COSP,
        COS4T,
        SIN4T,
        CTN4T;
    var COS2T,
        SIN2T,
        COST,
        SINT;
    var shouldSkipRotation = false;

    if (T < B) {
        TAN4T = evenRound(Math.abs(T) / Math.abs(B), 5);
        if (TAN4T < 0.00116) {
            if (B >= 0) {
                shouldSkipRotation = true;
                return [SINP, COSP, shouldSkipRotation];
            } else {
                SINP = 0.7071066;
                COSP = 0.7071066;
                return [SINP, COSP, shouldSkipRotation];
            }
        } else {
            // variables cascade to below
            COS4T = evenRound(1.0 / evenRound(Math.sqrt(1.0 + TAN4T * TAN4T), 8), 8);
            SIN4T = evenRound(TAN4T * COS4T, 8);
        }
    } else if (T === B) {
        if (T + B < 0.00116) {
            shouldSkipRotation = true;
            return [SINP, COSP, shouldSkipRotation];
        } else {
            // variables cascade to below
            COS4T = 0.7071066;
            SIN4T = 0.7071066;
        }
    } else {
        // case (T > B)
        CTN4T = evenRound(Math.abs(T / B), 5);
        if (CTN4T < 0.00116) {
            // variables cascade to below
            COS4T = 0.0;
            SIN4T = 1.0;
        } else {
            // variables cascade to below
            SIN4T = evenRound(1.0 / evenRound(Math.sqrt(1.0 + CTN4T * CTN4T), 8), 8);
            COS4T = evenRound(CTN4T * SIN4T, 8);
        }
    }

    // continue with casecade values to determine COS theta and SIN theta
    COS2T = evenRound(Math.sqrt((1.0 + COS4T) / 2.0), 8);
    SIN2T = evenRound(SIN4T / (2.0 * COS2T), 8);
    COST = evenRound(Math.sqrt((1.0 + COS2T) / 2.0), 8);
    SINT = evenRound(SIN2T / (2.0 * COST), 8);

    // determine COS phi and SIN phi
    if (B <= 0) {
        COSP = evenRound(0.7071066 * COST + 0.7071066 * SINT, 8);
        SINP = evenRound(Math.abs(0.7071066 * COST - 0.7071066 * SINT), 8);
    } else {
        COSP = COST;
        SINP = SINT;
    }
    // check T value
    if (T <= 0) {
        SINP = -SINP;
    }
    return [SINP, COSP, shouldSkipRotation];
};

export default getComparisonOfNumAndDen;
