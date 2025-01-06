import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:ui';

class FormTabs extends StatefulWidget {
  final String id;
  final String title;
  const FormTabs({required this.id, required this.title});

  @override
  State<FormTabs> createState() => _FormTabsState();
}

class _FormTabsState extends State<FormTabs> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10, horizontal: 5),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color.fromRGBO(36, 37, 43, 1),
        borderRadius: BorderRadius.circular(16),
        
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.title,
                style: GoogleFonts.urbanist(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              Text(
                widget.id,
                style: GoogleFonts.urbanist(
                  color: Colors.grey,
                  fontWeight: FontWeight.normal,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          SizedBox(width: 10),
          Icon(
            Icons.arrow_forward_ios_rounded,
            color: Colors.white,
          ),
        ],
      ),
    );
  }
}
