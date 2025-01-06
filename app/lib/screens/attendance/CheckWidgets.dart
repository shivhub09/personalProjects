import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CheckWidgets extends StatefulWidget {
  final String checkTitle;
  final IconData icon;
  const CheckWidgets({super.key, required this.checkTitle, required this.icon});

  @override
  State<CheckWidgets> createState() => _CheckWidgetsState();
}

class _CheckWidgetsState extends State<CheckWidgets> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.orange, Colors.redAccent],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            widget.checkTitle,
            style: GoogleFonts.poppins(
              fontSize: 24.0,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          Icon(
            widget.icon,
            size: 35,
            color: Colors.white,
          ),
        ],
      ),
    );
  }
}
