DELIMITER $$
-- DELIMITER is equal to the terminater sign. useally it is ";" but because we also want to end the trigger creation we set DELIMITER = $$
CREATE 
    TRIGGER my_trigger1 BEFORE INSERT
    ON employee
    FOR EACH ROW BEGIN 
        INSERT INTO trigger_test VALUES(NEW.first_name);
    END$$
DELIMITER ;


--conditional trigger
DELIMITER $$
CREATE 
    TRIGGER my_trigger2 BEFORE INSERT
    ON employee
    FOR EACH ROW BEGIN 
        IF NEW.SEX = 'M' THEN 
            INSERT INTO trigger_test VALUES('added male employee');
        ELSEIF NEW.SEX = 'F'  THEN 
            INSERT INTO trigger_test VALUES('added female');
        ELSE 
            INSERT INTO trigger_test VALUES('added other employee');
        END IF;
    END$$
DELIMITER ;

--to drop trigger
DROP TRIGGER my_trigger;