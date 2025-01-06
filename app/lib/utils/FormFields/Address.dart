import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Address extends StatefulWidget {
  final FormFieldSetter<String>? onChangedAddress;
  final FormFieldSetter<String>? onChangedStreetAddress;
  final FormFieldSetter<String>? onChangedStreetAddressLine2;
  final FormFieldSetter<String>? onChangedCity;
  final FormFieldSetter<String>? onChangedState;
  final FormFieldSetter<String>? onChangedPincode;
  final String? initialValue;
  final String addressTitle;

  Address({
    Key? key,
    this.onChangedAddress,
    this.onChangedStreetAddress,
    this.onChangedStreetAddressLine2,
    this.onChangedCity,
    this.onChangedState,
    this.onChangedPincode,
    this.initialValue,
    required this.addressTitle,
  }) : super(key: key);

  @override
  _AddressState createState() => _AddressState();
}

class _AddressState extends State<Address> {
  late TextEditingController addressController;
  late TextEditingController streetAddressController;
  late TextEditingController streetAddressLine2Controller;
  late TextEditingController cityController;
  late TextEditingController stateController;
  late TextEditingController pincodeController;

  @override
  void initState() {
    super.initState();
    addressController = TextEditingController(text: widget.initialValue);
    streetAddressController = TextEditingController(text: widget.initialValue);
    streetAddressLine2Controller =
        TextEditingController(text: widget.initialValue);
    cityController = TextEditingController(text: widget.initialValue);
    stateController = TextEditingController(text: widget.initialValue);
    pincodeController = TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    addressController.dispose();
    streetAddressController.dispose();
    streetAddressLine2Controller.dispose();
    cityController.dispose();
    stateController.dispose();
    pincodeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.addressTitle,
            style:
                GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: addressController,
            onChanged: widget.onChangedAddress,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter address';
              }
              return null;
            },
            decoration: InputDecoration(
              labelText: 'Address',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Street Address',
            // style: ,
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: streetAddressController,
            onChanged: widget.onChangedStreetAddress,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Street Address Line 2',
            // style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: streetAddressLine2Controller,
            onChanged: widget.onChangedStreetAddressLine2,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'City',
                      // style: Theme.of(context).textTheme.subtitle1,
                    ),
                    SizedBox(height: 12),
                    TextFormField(
                      controller: cityController,
                      onChanged: widget.onChangedCity,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'State/Province',
                      // style: Theme.of(context).textTheme.subtitle1,
                    ),
                    SizedBox(height: 12),
                    TextFormField(
                      controller: stateController,
                      onChanged: widget.onChangedState,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 20),
          Text(
            'Pincode/Zip Code',
            // style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: pincodeController,
            onChanged: widget.onChangedPincode,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
