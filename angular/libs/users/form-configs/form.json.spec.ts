import * as fs from 'fs';
import * as path from 'path';
import {
  ControlBuilder,
  GeneratorConfigBuilder,
  UiServiceBuilder,
  ValidatorBuilder,
} from '@patterson-angular/devkit';

//TODO: 1. Define the control(s) for the form; use the ControlBuilder to create the control(s).
const nameControl = new ControlBuilder()
  .setName('name')
  .setLabel('First Name')
  .setControlType('input')
  .setValidators([
    new ValidatorBuilder()
      .setValidatorType('required')
      .setMessage('First Name is required.')
      .build(),
  ]);

const uiService = new UiServiceBuilder().setName('FormJson');

// 2. Use the GeneratorConfigBuilder to add [control builders] and [ui service builder] to the generator config.
const generatorConfig = new GeneratorConfigBuilder()
  .setFormName('FormJsonForm')
  //TODO: 3. Add control builder(s) to the generator config as required.
  .addControlBuilder(nameControl)
  .setUIServiceBuilder(uiService)
  .build();

const configName = 'form.json-config';

//TODO: 4. Execute the `Run Jest on File` command from the command palette to run the tests|create the JSON configuration file.
describe('GeneratorConfig JSON Creation', () => {
  it('should create a valid JSON configuration file', () => {
    const configPath = path.join(__dirname, `${configName}.json`);
    fs.writeFileSync(configPath, JSON.stringify(generatorConfig, null, 2));
    console.log(`Configuration saved to ${configPath}`);
    expect(fs.existsSync(configPath)).toBeTruthy();
  });
});

describe('GeneratorConfig Validation Tests', () => {
  it('should have a valid form name', () => {
    expect(generatorConfig.formName).toBeTruthy();
  });

  it('should have at least one control item', () => {
    expect(generatorConfig.controls.length).toBeGreaterThanOrEqual(1);
  });

  it('each control should have a name, label, and control type', () => {
    generatorConfig.controls.forEach((control) => {
      expect(control.name).toBeTruthy();
      expect(control.label).toBeTruthy();
      expect(control.controlType).toBeTruthy();
    });
  });

  // Add any additional tests as needed
});

describe('GeneratorConfig Validator Tests', () => {
  generatorConfig.controls.forEach((control) => {
    describe(`Control: ${control.name}`, () => {
      it('should have validators if defined', () => {
        if (control.validators) {
          expect(control.validators.length).toBeGreaterThan(0);
        }
      });

      control.validators?.forEach((validator, index) => {
        describe(`Validator ${index + 1} for ${control.name}`, () => {
          it(`should have a valid validator type`, () => {
            expect(validator.validatorType).toBeTruthy();
          });

          it(`should have a validation message`, () => {
            expect(validator.message).toBeTruthy();
          });

          // Add tests for specific validator types if needed
          if (
            validator.validatorType === 'minLength' ||
            validator.validatorType === 'maxLength'
          ) {
            it(`should have a numeric value for ${validator.validatorType}`, () => {
              expect(typeof validator.value).toBe('number');
            });
          }

          // Add more conditional tests based on the validator types as required
        });
      });
    });
  });
});
